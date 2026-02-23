export default function ProgressBar({ current, total, showLabel }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="progress-wrapper">
      {showLabel && (
        <span className="progress-label">
          Question {current + 1} of {total}
        </span>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
