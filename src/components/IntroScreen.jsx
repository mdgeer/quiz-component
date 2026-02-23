export default function IntroScreen({ config, onStart }) {
  return (
    <div className="screen intro-screen">
      <div className="intro-card">
        <h1 className="intro-headline">{config.headline}</h1>
        <p className="intro-subheadline">{config.subheadline}</p>
        <button className="btn btn-primary" onClick={onStart}>
          {config.ctaLabel}
        </button>
      </div>
    </div>
  );
}
