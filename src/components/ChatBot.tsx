'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { botResponses } from '@/lib/data';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Assalamu Alaikum! 👋 I\'m your learning assistant. How can I help you today?\n\nTry asking about:\n• Navigation\n• Enrollment\n• Schedule\n• Exams\n• Certificates',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getBotResponse = (userMessage: string): string => {
        const lower = userMessage.toLowerCase().trim();

        for (const [key, response] of Object.entries(botResponses)) {
            if (lower.includes(key)) {
                return response;
            }
        }

        return botResponses.default;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        // Simulate bot thinking
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(input),
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 800);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-lg shadow-orange-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen ? 'rotate-0' : 'animate-pulse-glow'
                    }`}
                id="chat-bot-toggle"
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="gradient-primary px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Learning Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-orange-100 text-xs">Online</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'bot' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {msg.sender === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                                </div>
                                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.sender === 'bot'
                                        ? 'bg-white text-gray-700 rounded-tl-sm shadow-sm border border-gray-100'
                                        : 'gradient-primary text-white rounded-tr-sm shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
                        {['Help', 'Schedule', 'Exams', 'Certificates'].map((action) => (
                            <button
                                key={action}
                                onClick={() => {
                                    setInput(action);
                                    setTimeout(() => {
                                        const userMessage: Message = {
                                            id: Date.now().toString(),
                                            text: action,
                                            sender: 'user',
                                            timestamp: new Date(),
                                        };
                                        setMessages((prev) => [...prev, userMessage]);
                                        setTimeout(() => {
                                            const botMessage: Message = {
                                                id: (Date.now() + 1).toString(),
                                                text: getBotResponse(action),
                                                sender: 'bot',
                                                timestamp: new Date(),
                                            };
                                            setMessages((prev) => [...prev, botMessage]);
                                        }, 800);
                                        setInput('');
                                    }, 100);
                                }}
                                className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-medium hover:bg-orange-100 transition-colors whitespace-nowrap border border-orange-100"
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="px-4 py-3 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your question..."
                                className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 border border-gray-200"
                                id="chat-input"
                            />
                            <button
                                onClick={handleSend}
                                className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
                                id="chat-send"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
