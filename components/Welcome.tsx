interface WelcomeProps {
  onQuickMessage: (text: string) => void;
}

export default function Welcome({ onQuickMessage }: WelcomeProps) {
  const suggestions = [
    "What courses are offered?",
    "When is the enrollment?",
    "Tell me about the school.",
    "How to contact the office."
  ];

  return (
    <div className="welcome animate-fadeInUp">
      <h2 className="text-3xl font-bold text-[#030303] mb-3">Hi, Classmate!</h2>
      <p className="text-muted mb-8">I'm Hans, HNCS' AI assistant. Ask me anything about the school!</p>
      <div className="suggestions grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((text) => (
          <button 
            key={text}
            onClick={() => onQuickMessage(text)}
            className="suggestion-btn"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}