import { useState } from "react";

export default function EmailForm({ config, onSubmit, submitError, onErrorClear }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    await onSubmit({ name: name.trim(), email: email.trim() });
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

      {submitError && <p className="submit-error">{submitError}</p>}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Sending…" : config.submitLabel}
      </button>
    </form>
  );
}
