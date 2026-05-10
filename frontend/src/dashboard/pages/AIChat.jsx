import React, { useState, useEffect, useRef } from "react";
import {
    Bot, Edit3, Share, RefreshCw, MoreHorizontal,
    Plus, Link as LinkIcon, FileText, ChevronDown, Mic, Send, Sparkles
} from "lucide-react";
import { getChatHistory, sendChatMessage } from "../../services/chat-ai.service";

export default function AIChat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadHistory();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const loadHistory = async () => {
        try {
            const data = await getChatHistory();
            setMessages(data || []);
        } catch (error) {
            console.error('Failed to load chat history', error);
        }
    };

    const handleSend = async () => {
        const text = inputValue.trim();
        if (!text) return;

        // Optimistically add user message
        const optimisticMsg = { id: Date.now(), sender: 'user', content: text, createdAt: new Date().toISOString() };
        setMessages(prev => [...prev, optimisticMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            const result = await sendChatMessage(text);
            // Replace optimistic user message & append AI if returned
            if (result && result.aiMessage) {
                setMessages(prev => {
                    const filtered = prev.filter(m => m.id !== optimisticMsg.id);
                    return [...filtered, result.userMessage, result.aiMessage];
                });
            } else {
                await loadHistory();
            }
        } catch (error) {
            console.error('Failed to send message', error);
            // Optionally remove optimistic msg or show error
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatMarkdown = (text) => {
        if (!text) return text;
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i !== text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="flex flex-col h-full bg-[#f8faf9] relative font-['DM_Sans',sans-serif]">
            {/* Dotted Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-8 md:px-12 relative z-10 flex flex-col gap-8 max-w-5xl mx-auto w-full">

                {messages.length === 0 && !isLoading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 mt-10">
                        <Bot className="w-16 h-16 text-[#00843D] mb-4" />
                        <h2 className="text-xl font-bold text-gray-800">Manomboka dinika</h2>
                        <p className="text-sm text-gray-500 mt-2">Lazao ahy izay ilainao ary asaovy manampy anao aho</p>
                    </div>
                )}

                {messages.map((msg) => (
                    msg.sender === 'user' ? (
                        <div key={msg.id} className="flex items-start justify-end gap-3 max-w-[90%] md:max-w-[70%] self-end group">
                            <div className="bg-white px-6 py-4 rounded-3xl rounded-tr-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                                <p className="text-[15px] font-medium text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {msg.content}
                                </p>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="w-10 h-10 rounded-2xl object-cover shadow-sm bg-gray-100 shrink-0"
                                alt="User"
                            />
                        </div>
                    ) : (
                        <div key={msg.id} className="flex items-start gap-4 max-w-[95%] md:max-w-[75%] mt-2">
                            <div className="w-10 h-10 rounded-2xl bg-[#00843D] shrink-0 flex items-center justify-center text-white shadow-lg shadow-[#00843D]/20 mt-1">
                                <Bot className="w-6 h-6" />
                            </div>

                            <div className="flex-1 flex flex-col gap-1.5">
                                <div className="flex items-end gap-2 ml-1">
                                    <h3 className="font-bold text-gray-900 text-lg">MadagIAscar</h3>
                                </div>

                                <div className="bg-white p-6 rounded-3xl rounded-tl-sm shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/80 flex flex-col gap-4 overflow-hidden">
                                    <p className="text-[15px] text-gray-600 leading-relaxed">
                                        {formatMarkdown(msg.content)}
                                    </p>

                                    {/* Action Bar */}
                                    <div className="mt-3 flex items-center justify-between text-gray-400">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-300">Vao haingana</span>
                                        <div className="flex items-center gap-1.5">
                                            <button className="p-1.5 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition"><Edit3 className="w-4 h-4" /></button>
                                            <button className="p-1.5 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition"><Share className="w-4 h-4" /></button>
                                            <button className="p-1.5 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition"><RefreshCw className="w-4 h-4" /></button>
                                            <button className="p-1.5 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition"><MoreHorizontal className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}

                {isLoading && (
                    <div className="flex items-start gap-4 max-w-[95%] md:max-w-[75%] mt-2 opacity-60">
                        <div className="w-10 h-10 rounded-2xl bg-[#00843D] shrink-0 flex items-center justify-center text-white shadow-lg shadow-[#00843D]/10 mt-1">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                            <div className="flex items-end gap-2 ml-1">
                                <h3 className="font-bold text-gray-900 text-lg">MadagIAscar</h3>
                            </div>
                            <div className="bg-white px-6 py-5 rounded-3xl rounded-tl-sm shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 flex items-center gap-2 w-24">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Floating Bar */}
            <div className="px-4 pb-6 w-full max-w-4xl mx-auto z-20 shrink-0">
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white flex flex-col overflow-hidden">

                    {/* Top Banner */}
                    <div className="bg-[#00843D]/[0.03] pt-2 pb-1.5 text-center w-full border-b border-[#00843D]/[0.04]">
                        <span className="text-[10px] font-bold text-[#00843D]/50 uppercase tracking-[2px]">
                            Mahazoa ny torohevitra tsara indrindra avy amin'ny IA.
                        </span>
                    </div>

                    <div className="flex flex-col px-4 pt-4 pb-3 bg-white/60">
                        <div className="flex items-start gap-2">
                            <Sparkles className="w-5 h-5 text-[#00843D]/80 mt-0.5 shrink-0" />
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 min-h-[50px] max-h-32 bg-transparent resize-none outline-none text-sm md:text-[15px] font-medium text-gray-800 placeholder:text-gray-300 placeholder:font-normal leading-relaxed"
                                placeholder="Soraty eto ny fanontanianao ary avelao i MadagIAscar hisahana ny sisa..."
                            />
                        </div>

                        <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1 text-gray-400 pl-6">
                                <button className="p-2 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition"><Plus className="w-4 h-4" /></button>
                                <button className="p-2 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition"><LinkIcon className="w-4 h-4" /></button>
                                <button className="p-2 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition"><FileText className="w-4 h-4" /></button>
                            </div>

                            <div className="flex items-center gap-2 pr-1">
                                <button className="hidden sm:flex px-3 py-2 rounded-xl border border-gray-100 bg-white shadow-sm text-[11px] font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 items-center gap-1.5 transition">
                                    Fitaovana <ChevronDown className="w-3 h-3" />
                                </button>
                                <button className="bg-gray-50 hover:bg-gray-100 text-gray-500 p-2.5 rounded-[14px] transition-colors shadow-sm">
                                    <Mic className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    className="bg-[#172018] hover:bg-[#00843D] disabled:opacity-50 disabled:hover:bg-[#172018] disabled:cursor-not-allowed text-white p-2.5 rounded-[14px] transition-all shadow-[0_4px_12px_rgba(0,132,61,0.2)] hover:shadow-[0_8px_20px_rgba(0,132,61,0.3)]"
                                >
                                    <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
