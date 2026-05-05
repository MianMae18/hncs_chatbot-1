'use client';

import { useState, useEffect, useRef } from 'react';
import Welcome from './Welcome';
import MessageBubble from './MessageBubble';
import Header from './Header';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    const currentMessages = [...messages, userMessage];
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages }),
      });

      const text = await res.text();
      const clean = text.replace(/\p{Extended_Pictographic}/gu, '');
      const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: clean };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      const errMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Hans ran into a little trouble. Try again!' };
      setMessages(prev => [...prev, errMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage();
  };

  const handleQuickMessage = (text: string) => {
    setInput(text);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  return (
    <div className="app-root">
      <Header />
      <div id="chat-container">
        {messages.length === 0 ? (
          <Welcome onQuickMessage={handleQuickMessage} />
        ) : (
          <div id="chat-messages">
            {messages.map((m) => (
              <MessageBubble key={m.id} role={m.role} content={m.content} />
            ))}
            {isLoading && (
              <div className="message bot typing" aria-live="polite">
                <div className="message-avatar" role="img" aria-label="Assistant">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="false">
                    <rect x="3" y="7" width="18" height="11" rx="2" fill="var(--main-color)" />
                    <rect x="7" y="3" width="10" height="6" rx="1" fill="var(--main-color2)" />
                    <circle cx="9.5" cy="12" r="1.2" fill="white" />
                    <circle cx="14.5" cy="12" r="1.2" fill="white" />
                    <rect x="10.5" y="15" width="3" height="1.5" rx="0.5" fill="white" />
                  </svg>
                </div>
                <div className="typing-indicator" aria-hidden="true">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-area">
        <div className="input-wrapper">
          <textarea
            id="userInput"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void sendMessage();
              }
            }}
            placeholder="Ask something about the school..."
            rows={1}
          />
          <button id="sendBtn" type="submit" title="Send Message" disabled={isLoading}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
        <p className="input-footer">HNCS Chatbot Assistant may produce inaccurate information. Please verify important details.</p>
      </form>
    </div>
  );
}