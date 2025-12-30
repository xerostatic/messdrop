"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Message } from "@/lib/db/schema";
import { FloatingMessage } from "./FloatingMessage";
import { Particles } from "./Particles";
import { MessageComposer } from "./MessageComposer";

export function OceanVoid() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();

    // Refresh messages every 30 seconds
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  return (
    <div className="fixed inset-0 ocean-void overflow-hidden">
      {/* Ambient particles */}
      <Particles />

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Header */}
      <motion.header
        className="absolute top-0 left-0 right-0 z-40 p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl tracking-wide text-white/90">
            <span className="glow-cyan">Drift</span>
          </h1>
          <p className="font-body text-sm text-white/30 mt-2 tracking-widest uppercase">
            Messages in the void
          </p>
        </div>
      </motion.header>

      {/* Message count indicator */}
      <motion.div
        className="absolute top-8 right-8 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="glass px-3 py-1.5 rounded-full">
          <span className="text-xs font-mono text-white/40">
            {messages.length} drifting
          </span>
        </div>
      </motion.div>

      {/* Floating messages */}
      <div className="absolute inset-0">
        {isLoading ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <motion.div
                className="w-8 h-8 border-2 border-biolum-cyan/30 border-t-biolum-cyan rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-white/30 font-body text-sm">
                Surfacing messages...
              </p>
            </div>
          </motion.div>
        ) : messages.length === 0 ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center max-w-md px-4">
              <p className="text-white/40 font-display text-xl mb-2">
                The void is quiet
              </p>
              <p className="text-white/20 font-body text-sm">
                Be the first to drop a message into the abyss
              </p>
            </div>
          </motion.div>
        ) : (
          messages.map((message, index) => (
            <FloatingMessage
              key={message.id}
              message={message}
              index={index}
              total={messages.length}
            />
          ))
        )}
      </div>

      {/* Composer */}
      <MessageComposer onMessageSent={fetchMessages} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void-950 to-transparent pointer-events-none" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.4) 100%)"
      }} />
    </div>
  );
}

