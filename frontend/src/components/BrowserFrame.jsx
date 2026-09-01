export default function BrowserFrame({ label = "app.encodecampus", children, tone = "light" }) {
  return (
    <div className={`browser browser--${tone}`}>
      <div className="browser__bar">
        <span className="browser__dot" />
        <span className="browser__dot" />
        <span className="browser__dot" />
        <span className="browser__addr">{label}</span>
      </div>
      <div className="browser__body">{children}</div>
    </div>
  );
}
