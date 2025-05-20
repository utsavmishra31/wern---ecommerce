import { useState } from "react";
import axios from "axios";
import { MessageSquare } from "lucide-react";

const ChatbotBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", text: "Hi! Ask me anything about clothing." }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/ai/chat", { message: input });
      const botReply = { role: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, I couldn't respond." }]);
    }
  };

  return (
    <div>
      <div className="fixed bottom-6 right-10 z-50">
        {isOpen ? (
          <div className="w-96 h-[25rem] bg-white border rounded-xl shadow-lg flex flex-col">
            <div className="bg-black text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
              <span>Wern Assistant</span>
              <button onClick={() => setIsOpen(false)}>✖</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`text-sm p-2 rounded ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex p-2 border-t">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 border rounded-l px-2 py-1"
                placeholder="Ask something..."
              />
              <button onClick={handleSend} className="bg-black text-white px-3 py-1 rounded-r">
                Send
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800"
          >
            <MessageSquare />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatbotBox;
