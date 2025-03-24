import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageCircle, Send, X, Image as ImageIcon, Paperclip } from 'lucide-react';
import { Button, Input, Avatar } from '@nextui-org/react';
import { RootState } from '../store/store';
import { formatRelativeTime } from '../types';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock messages - Replace with actual messages from your backend
  const [messages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! ¿En qué podemos ayudarte?',
      sender: 'admin',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'read'
    },
    {
      id: '2',
      content: 'Hola, tengo una pregunta sobre mi pedido',
      sender: 'user',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      status: 'read'
    },
    {
      id: '3',
      content: 'Por supuesto, ¿cuál es tu número de pedido?',
      sender: 'admin',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      status: 'read'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Here you would send the message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  if (!user?.isApproved) return null;

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar
              src="https://i.pravatar.cc/150?u=support"
              size="sm"
            />
            <div>
              <h3 className="font-semibold">Soporte SemillasShop</h3>
              <p className="text-xs text-green-600">En línea</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                <p>{msg.content}</p>
                <div
                  className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}
                >
                  {formatRelativeTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              endContent={
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              }
            />
            <Button
              type="submit"
              isIconOnly
              color="primary"
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;