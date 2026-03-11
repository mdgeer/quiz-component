import { Link } from "react-router-dom";
import { quizRegistry } from "../quizConfigs";

export default function HubPage() {
  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", fontFamily: "sans-serif" }}>
      <h1>Quizzes</h1>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 32 }}>
        {Object.entries(quizRegistry).map(([slug, config]) => (
          <li key={slug} style={{ marginBottom: 16 }}>
            <Link to={`/${slug}`} style={{ fontSize: 18 }}>
              {config.intro.headline}
            </Link>
            <p style={{ margin: "4px 0 0", color: "#666" }}>{config.intro.subheadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
