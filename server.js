import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KIT_API = 'https://api.kit.com/v4';
const PORT = process.env.PORT || 3000;

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
  const { name, email, answerFields = {}, scorePercent } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!process.env.KIT_API_KEY) {
    console.error('[/api/subscribe] KIT_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const firstName = name?.trim().split(' ')[0] ?? '';

  try {
    // 1. Create or update the subscriber.
    //    Kit custom fields required: the_golf_iq_test_answers, the_golf_iq_test_score
    await kitFetch('/subscribers', 'POST', {
      email_address: email,
      first_name: firstName,
      fields: {
        ...answerFields,
        the_golf_iq_test_score: scorePercent ?? '',
      },
    });

    // 2. Upsert tag and apply to subscriber.
    const tagId = await upsertTag('the_golf_iq_test');
    await addSubscriberToTag(tagId, email);

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
