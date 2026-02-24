import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KIT_API = 'https://api.kit.com/v4';
const PORT = process.env.PORT || 3000;

// ─── Score → tier mapping (10-question quiz) ─────────────────
// 0–4  → Bogey Mindset
// 5–6  → Solid Thinker
// 7–8  → Course Manager
// 9–10 → Tour Mentality
const TIERS = [
  { max: 4,  label: 'Bogey Mindset',   slug: 'bogey-mindset'   },
  { max: 6,  label: 'Solid Thinker',   slug: 'solid-thinker'   },
  { max: 8,  label: 'Course Manager',  slug: 'course-manager'  },
  { max: 10, label: 'Tour Mentality',  slug: 'tour-mentality'  },
];

function getTier(score) {
  return TIERS.find(t => score <= t.max) ?? TIERS[TIERS.length - 1];
}

// ─── Kit API helpers ─────────────────────────────────────────
async function kitFetch(endpoint, method = 'GET', body = null) {
  const res = await fetch(`${KIT_API}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': process.env.KIT_API_KEY,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Kit ${method} ${endpoint} → ${res.status}: ${text}`);
  }
  return JSON.parse(text);
}

// Find an existing tag by exact name, or create it. Returns the tag ID.
async function upsertTag(name) {
  const data = await kitFetch(`/tags?name=${encodeURIComponent(name)}`);
  const existing = data.tags?.find(t => t.name === name);
  if (existing) return existing.id;

  const created = await kitFetch('/tags', 'POST', { name });
  return created.tag.id;
}

async function addSubscriberToTag(tagId, emailAddress) {
  await kitFetch(`/tags/${tagId}/subscribers`, 'POST', {
    email_address: emailAddress,
  });
}

// ─── Subscribe endpoint ───────────────────────────────────────
app.post('/api/subscribe', async (req, res) => {
  const {
    name,
    email,
    level,
    score = 0,
    totalQuestions = 10,
    quizSlug = 'golf-iq',
  } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!process.env.KIT_API_KEY) {
    console.error('[/api/subscribe] KIT_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const tier = getTier(score);
  const firstName = name?.trim().split(' ')[0] ?? '';

  try {
    // 1. Create or update the subscriber with custom fields.
    //    Note: quiz_name, quiz_score, quiz_result, and self_reported_level
    //    must be created as custom fields in your Kit account first.
    await kitFetch('/subscribers', 'POST', {
      email_address: email,
      first_name: firstName,
      fields: {
        quiz_name:            quizSlug,
        quiz_score:           `${score}/${totalQuestions}`,
        quiz_result:          tier.label,
        self_reported_level:  level ?? '',
      },
    });

    // 2. Upsert both tags, then apply them to the subscriber.
    const takenTagName  = `quiz:taken:${quizSlug}`;
    const resultTagName = `quiz:result:${tier.slug}`;

    const [takenId, resultId] = await Promise.all([
      upsertTag(takenTagName),
      upsertTag(resultTagName),
    ]);

    await Promise.all([
      addSubscriberToTag(takenId,  email),
      addSubscriberToTag(resultId, email),
    ]);

    return res.json({ ok: true });

  } catch (err) {
    console.error('[/api/subscribe]', err.message);
    return res.status(502).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// ─── Serve built Vite app (production) ───────────────────────
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/{*splat}', (_, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
