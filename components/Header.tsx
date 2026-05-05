export default function Header() {
  return (
    <header>
      <div id="header-icon">
        <img src="/hncs logo.png" title="HNCS" alt="HNCS Logo" />
      </div>
      <div className="header-content frosted">
        <div className="header-info">
          <h1>Holy Nazarene Christian School</h1>
          <h2>Chatbot Assistant</h2>
          <p>
            <span className="status-dot"></span>
            Online - Powered by Gemini
          </p>
        </div>
        <span className="header-badge">FREE</span>
      </div>
    </header>
  );
}