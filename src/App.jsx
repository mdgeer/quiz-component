import { useState } from "react";
import quizConfig from "./quizConfig";
import IntroScreen from "./components/IntroScreen";
import QuestionScreen from "./components/QuestionScreen";
import CaptureScreen from "./components/CaptureScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleStart() {
    setCurrentScreen("question");
    setCurrentIndex(0);
    setAnswers([]);
    setScore(0);
    setSubmitted(false);
    setSubmitError("");
  }

  function handleAnswer(answerIndex) {
    const question = quizConfig.questions[currentIndex];
    const isCorrect = question.answers[answerIndex].correct;
    const newAnswers = [
      ...answers,
      { questionIndex: currentIndex, answerIndex, isCorrect },
    ];
    const newScore = score + (isCorrect ? 1 : 0);

    setAnswers(newAnswers);
    setScore(newScore);

    const isLast = currentIndex === quizConfig.questions.length - 1;
    if (isLast) {
      setCurrentScreen("capture");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  async function handleSubmit({ name, email, level }) {
    setSubmitError("");
    const payload = {
      name,
      email,
      level,
      score,
      totalQuestions: quizConfig.questions.length,
      quizSlug: quizConfig.quizSlug,
      answers,
    };

    try {
      const res = await fetch(quizConfig.capture.submitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Non-2xx response");
      setSubmitted(true);
    } catch {
      setSubmitError(quizConfig.capture.errorMessage);
    }
  }

  if (currentScreen === "intro") {
    return <IntroScreen config={quizConfig.intro} onStart={handleStart} />;
  }

  if (currentScreen === "question") {
    return (
      <QuestionScreen
        config={quizConfig}
        question={quizConfig.questions[currentIndex]}
        currentIndex={currentIndex}
        totalQuestions={quizConfig.questions.length}
        onAnswer={handleAnswer}
      />
    );
  }

  return (
    <CaptureScreen
      config={quizConfig.capture}
      submitted={submitted}
      submitError={submitError}
      onSubmit={handleSubmit}
      onErrorClear={() => setSubmitError("")}
    />
  );
}
