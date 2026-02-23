export default function AnswerButton({ text, onClick, selected, disabled }) {
  const className = `btn answer-btn${selected ? " answer-selected" : ""}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
