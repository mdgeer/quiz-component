import EmailForm from "./EmailForm";
import SuccessBanner from "./SuccessBanner";

export default function CaptureScreen({
  config,
  submitted,
  submitError,
  onSubmit,
  onErrorClear,
}) {
  return (
    <div className="screen capture-screen">
      <div className="capture-card">
        <h2 className="capture-headline">{config.headline}</h2>
        <p className="capture-subheadline">{config.subheadline}</p>

        {submitted ? (
          <SuccessBanner message={config.successMessage} />
        ) : (
          <EmailForm
            config={config}
            onSubmit={onSubmit}
            submitError={submitError}
            onErrorClear={onErrorClear}
          />
        )}
      </div>
    </div>
  );
}
