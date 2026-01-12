import React, { useState, useEffect, useRef } from "react";
import { Bot, Send, X, MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useLanguage } from "../contexts/LanguageContext";

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<{ role: "bot" | "user"; content: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const { t } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chat, isTyping]);

    const handleSend = () => {
        if (!message.trim()) return;

        const userMessage = message.trim();
        setChat((prev) => [...prev, { role: "user", content: userMessage }]);
        setMessage("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let botResponse = t.aiResponse1;
            if (userMessage.toLowerCase().includes("farmer") || userMessage.toLowerCase().includes("sell")) {
                botResponse = t.aiResponse2;
            } else if (userMessage.toLowerCase().includes("trend") || userMessage.toLowerCase().includes("demand") || userMessage.toLowerCase().includes("market")) {
                botResponse = t.aiResponse3;
            }

            setChat((prev) => [...prev, { role: "bot", content: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            onClick={() => {
                                setIsOpen(true);
                                if (chat.length === 0) {
                                    setChat([{ role: "bot", content: t.aiAssistantWelcome }]);
                                }
                            }}
                            size="icon"
                            className="w-16 h-16 rounded-full shadow-2xl bg-green-600 hover:bg-green-700 border-4 border-white"
                        >
                            <Bot className="w-8 h-8 text-white" />
                        </Button>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-12 right-0 bg-white px-3 py-1 rounded-lg shadow-md border border-green-100 whitespace-nowrap"
                        >
                            <p className="text-xs font-bold text-green-700 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> {t.aiAssistantAsk}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="w-[350px] sm:w-[400px]"
                    >
                        <Card className="shadow-2xl border-green-100 overflow-hidden">
                            <CardHeader className="bg-green-600 text-white p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-white/20 p-1.5 rounded-lg">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-sm font-bold">{t.aiAssistantLogo}</CardTitle>
                                            <p className="text-[10px] text-green-100 opacity-80">Always active for you</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsOpen(false)}
                                        className="text-white hover:bg-white/10 h-8 w-8"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="p-0">
                                <div
                                    ref={scrollRef}
                                    className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50/50"
                                    style={{ scrollBehavior: 'smooth' }}
                                >
                                    {chat.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: msg.role === "bot" ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "bot"
                                                        ? "bg-white border border-green-100 text-gray-800 rounded-tl-none shadow-sm"
                                                        : "bg-green-600 text-white rounded-tr-none shadow-md"
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-green-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                                <div className="flex gap-1">
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="p-3 border-t bg-white">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex w-full items-center gap-2"
                                >
                                    <Input
                                        placeholder={t.aiAssistantPlaceholder}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="flex-1 bg-gray-50 border-gray-200"
                                    />
                                    <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700 h-10 w-10 shrink-0">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
