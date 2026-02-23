import { useState } from "react";

const LEVELS = [
  { value: "beginner", label: "Beginner", sub: "20+ handicap" },
  { value: "mid", label: "Mid-handicap", sub: "10–20" },
  { value: "single", label: "Single digit", sub: "5–10" },
  { value: "scratch", label: "Scratch or better", sub: "Under 5" },
];

export default function EmailForm({ config, onSubmit, submitError, onErrorClear }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onErrorClear();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await onSubmit({ name: name.trim(), email: email.trim(), level });
    setLoading(false);
  }

  return (
    <form className="email-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="capture-name">Name</label>
        <input
          id="capture-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="capture-email">Email</label>
        <input
          id="capture-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="level-selector">
        <p className="level-selector-label">What's your current level?</p>
        <div className="level-grid">
          {LEVELS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`level-btn${level === opt.value ? " level-btn-selected" : ""}`}
              onClick={() => setLevel(opt.value)}
              disabled={loading}
            >
              <span className="level-btn-label">{opt.label}</span>
              <span className="level-btn-sub">{opt.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {submitError && <p className="submit-error">{submitError}</p>}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Sending…" : config.submitLabel}
      </button>
    </form>
  );
}
