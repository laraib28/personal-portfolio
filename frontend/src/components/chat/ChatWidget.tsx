"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Minimize2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ContactForm } from "./ContactForm";

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "assistant",
  content: `Hello! I'm here to help you learn about this developer's expertise in full-stack development and AI systems.

I can tell you about:
- Technical skills and proficiency levels
- Portfolio projects and case studies
- AI and agentic systems experience
- How to get in touch

What would you like to know?`,
};

const UNAVAILABLE_MESSAGE = "I'm temporarily unavailable. Please try again in a moment, or use the contact form to leave your details.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId] = useState(() => `conv-${Date.now()}`);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      // Create placeholder for assistant response
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "" },
      ]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: content, conversationId }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response stream");
        }

        const decoder = new TextDecoder();
        let accumulatedContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                continue;
              }
              if (data.startsWith("[ERROR]")) {
                throw new Error(data.slice(8));
              }
              accumulatedContent += data;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                )
              );
            }
          }
        }
      } catch (err) {
        console.error("Chat error:", err);
        const errorMessage = err instanceof Error ? err.message : "An error occurred";

        // Check if service is unavailable (network error or 503)
        if (errorMessage.includes("fetch") || errorMessage.includes("503") || errorMessage.includes("unavailable")) {
          setIsServiceAvailable(false);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: UNAVAILABLE_MESSAGE }
                : msg
            )
          );
        } else {
          setError(errorMessage);
          // Remove the empty assistant message on error
          setMessages((prev) =>
            prev.filter((msg) => msg.id !== assistantMessageId)
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId]
  );

  const toggleOpen = () => {
    if (!isOpen) {
      setIsMinimized(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleContactSuccess = (successMessage: string) => {
    setShowContactForm(false);
    // Add success message to chat
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      role: "assistant",
      content: successMessage,
    };
    setMessages((prev) => [...prev, systemMessage]);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleOpen}
            className={cn(
              "fixed bottom-6 right-6 z-50",
              "flex h-14 w-14 items-center justify-center",
              "rounded-full bg-primary text-primary-foreground shadow-lg",
              "transition-transform hover:scale-105",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-6 right-6 z-50",
              "flex flex-col overflow-hidden",
              "rounded-2xl border bg-background shadow-2xl",
              "w-[380px] max-w-[calc(100vw-48px)]",
              isMinimized ? "h-14" : "h-[600px] max-h-[calc(100vh-100px)]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <MessageCircle className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Portfolio Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    {isLoading ? "Thinking..." : "Online"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMinimize}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleOpen}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages or Contact Form */}
            {!isMinimized && (
              <>
                {showContactForm ? (
                  <ContactForm
                    onClose={() => setShowContactForm(false)}
                    onSuccess={handleContactSuccess}
                  />
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="flex flex-col gap-3">
                        {messages.map((message) => (
                          <ChatMessage key={message.id} message={message} />
                        ))}
                        {isLoading && messages[messages.length - 1]?.content === "" && (
                          <ThinkingIndicator />
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="mx-4 mb-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                        {error}
                      </div>
                    )}

                    {/* Contact button and Input */}
                    <div className="border-t">
                      <div className="flex items-center justify-center py-2 border-b">
                        <button
                          onClick={() => setShowContactForm(true)}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-1.5",
                            "text-xs font-medium text-muted-foreground",
                            "transition-colors hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Leave your contact info
                        </button>
                      </div>
                      <ChatInput
                        onSend={sendMessage}
                        disabled={isLoading}
                        placeholder="Ask about skills, projects..."
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
      </div>
    </div>
  );
}
