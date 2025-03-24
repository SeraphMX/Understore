import React, { useState } from 'react';
import { 
  Input, 
  Avatar, 
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Image as ImageIcon, 
  Paperclip,
  Phone,
  Video,
  UserPlus,
  Ban,
  Archive
} from 'lucide-react';
import { formatRelativeTime } from '../../types';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'online' | 'offline' | 'away';
  isTyping?: boolean;
}

// Mock data
const users: ChatUser[] = [
  {
    id: '1',
    name: 'María García',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    lastMessage: 'Gracias por la información',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    status: 'online'
  },
  {
    id: '2',
    name: 'Juan Pérez',
    avatar: 'https://i.pravatar.cc/150?u=juan',
    lastMessage: '¿Cuándo llegará mi pedido?',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    status: 'offline'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    lastMessage: 'Ok, esperaré la confirmación',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    status: 'away',
    isTyping: true
  }
];

const messages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      content: 'Hola, ¿tienen semillas de lavanda disponibles?',
      sender: 'user',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'read'
    },
    {
      id: '2',
      content: '¡Hola! Sí, tenemos disponibles semillas de lavanda francesa. ¿Cuántas necesitas?',
      sender: 'admin',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      status: 'read'
    },
    {
      id: '3',
      content: 'Me gustaría comprar 100 gramos',
      sender: 'user',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      status: 'read'
    }
  ]
};

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(users[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    // Here you would send the message to your backend
    console.log('Sending message to', selectedUser.name, ':', message);
    setMessage('');
  };

  const getStatusColor = (status: ChatUser['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Users List */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <Input
            placeholder="Buscar conversación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="text-gray-400" />}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                selectedUser?.id === user.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="relative">
                <Avatar
                  src={user.avatar}
                  className="w-10 h-10"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    getStatusColor(user.status)
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium truncate">{user.name}</p>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(user.lastMessageTime)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {user.isTyping ? (
                    <p className="text-sm text-green-600">Escribiendo...</p>
                  ) : (
                    <p className="text-sm text-gray-600 truncate">
                      {user.lastMessage}
                    </p>
                  )}
                  {user.unreadCount > 0 && (
                    <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {user.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar
                  src={selectedUser.avatar}
                  className="w-10 h-10"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    getStatusColor(selectedUser.status)
                  }`}
                />
              </div>
              <div>
                <h2 className="font-semibold">{selectedUser.name}</h2>
                <p className="text-sm text-gray-600 capitalize">
                  {selectedUser.status}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                variant="light"
                className="text-gray-700"
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className="text-gray-700"
              >
                <Video className="w-5 h-5" />
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-gray-700"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    startContent={<UserPlus className="w-4 h-4" />}
                  >
                    Agregar a Grupo
                  </DropdownItem>
                  <DropdownItem
                    startContent={<Archive className="w-4 h-4" />}
                  >
                    Archivar Chat
                  </DropdownItem>
                  <DropdownItem
                    startContent={<Ban className="w-4 h-4" />}
                    className="text-danger"
                    color="danger"
                  >
                    Bloquear Usuario
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages[selectedUser.id]?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'admin' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === 'admin'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p>{msg.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      msg.sender === 'admin' ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {formatRelativeTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t">
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
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Selecciona una conversación para comenzar
        </div>
      )}
    </div>
  );
};

export default Chat;