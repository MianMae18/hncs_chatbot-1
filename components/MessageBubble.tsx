import dynamic from 'next/dynamic';
import Avatar from './Avatar';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

export default function MessageBubble({ role, content }: { role: string; content: any }) {
  const isUser = role === 'user';

  const text = typeof content === 'string'
    ? content
    : Array.isArray(content)
      ? content.map((c: any) => c.text || '').join('')
      : String(content);

  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      <div className="message-avatar">
        {isUser ? null : <Avatar size={36} />}
      </div>
      <div className="message-content">
        {isUser ? (
          <p className="message-text user-text">{text}</p>
        ) : (
          <div className="prose bot-text">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}