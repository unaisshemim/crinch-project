import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyzeFlirtingSkill } from "../utils/flirtScoreai";

interface Message {
  id: number;
  text: string;
  sender: string;
  score: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [flirtingScores, setFlirtingScores] = useState<
    { time: string; score: number }[]
  >([]);
  const currentUser = "John";

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { score, reply } = await analyzeFlirtingSkill(newMessage);

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: currentUser,
      score,
    };

    const aiMessage = {
      id: messages.length + 2,
      text: reply,
      sender: "AI",
      score: 0,
    };

    setMessages([...messages, userMessage, aiMessage]);
    setFlirtingScores([
      ...flirtingScores,
      { time: new Date().toLocaleTimeString(), score },
    ]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 w">Love Chat</h1>
      <div className="w-full w-[70vw] bg-whiite rounded-lg shadow-md p-4 flex gap-4 flex-row">
        {/* Chat Section */}
        <div className="w-2/3 flex flex-col">
          <ScrollArea className="h-96 overflow-y-auto border rounded-lg p-2 bg-gray-50">
            <div className="space-y-2">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet...</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === currentUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 text-sm shadow-md ${
                        message.sender === currentUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs text-gray-200 mt-1">
                        Flirting Score: {message.score ?? "-"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex gap-2 mt-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded p-2"
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
        {/* Flirting Score Chart */}
        <div className="w-1/3 flex flex-col items-center">
          <h2 className="text-sm font-bold mb-2">Flirting Skill Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={flirtingScores}>
              <XAxis dataKey="time" fontSize={10} tickMargin={5} />
              <YAxis domain={[0, 10]} fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#e63946"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chat;