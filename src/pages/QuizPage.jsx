import { useParams, Navigate } from "react-router-dom";
import { quizRegistry } from "../quizConfigs";
import App from "../App";

export default function QuizPage() {
  const { slug } = useParams();
  const config = quizRegistry[slug];

  if (!config) return <Navigate to="/" replace />;
  return <App config={config} />;
}
