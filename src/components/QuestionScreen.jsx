import { useState } from "react";
import ProgressBar from "./ProgressBar";
import AnswerButton from "./AnswerButton";

export default function QuestionScreen({
  config,
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}) {
  const { options } = config;
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleSelect(i) {
    if (selectedIndex !== null) return;
    setSelectedIndex(i);

    setTimeout(() => {
      setSelectedIndex(null);
      onAnswer(i);
    }, options.feedbackDurationMs);
  }

  return (
    <div className="screen question-screen">
      <div className="question-card">
        <ProgressBar
          current={currentIndex}
          total={totalQuestions}
          showLabel={options.showQuestionLabel}
        />

        {question.image && (
          <img
            className="question-image"
            src={question.image}
            alt={question.smallHeadline}
          />
        )}

        <div className="question-content">
          {question.smallHeadline && (
            <p className="question-small-headline">{question.smallHeadline}</p>
          )}
          {question.summary && (
            <p className="question-summary">{question.summary}</p>
          )}
          <p className="question-text">{question.question}</p>
        </div>

        <div className="answers-grid">
          {question.answers.map((answer, i) => (
            <AnswerButton
              key={i}
              text={answer.text}
              onClick={() => handleSelect(i)}
              selected={selectedIndex === i}
              disabled={selectedIndex !== null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
