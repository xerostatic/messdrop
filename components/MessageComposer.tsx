"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageComposerProps {
  onMessageSent: () => void;
}

export function MessageComposer({ onMessageSent }: MessageComposerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });

      if (res.ok) {
        setMessage("");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsOpen(false);
          onMessageSent();
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:border-biolum-cyan/40">
          <motion.div
            className="w-2 h-2 rounded-full bg-biolum-cyan"
            animate={{
              boxShadow: [
                "0 0 10px rgba(34, 211, 238, 0.5)",
                "0 0 20px rgba(34, 211, 238, 0.8)",
                "0 0 10px rgba(34, 211, 238, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-body text-white/70 group-hover:text-biolum-cyan transition-colors">
            Drop a message into the void
          </span>
        </div>
      </motion.button>

      {/* Composer Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-void-950/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg px-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="glass rounded-2xl p-6 border-biolum-cyan/20">
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        className="text-4xl mb-4"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [1, 0.8, 0],
                        }}
                        transition={{ duration: 1.5 }}
                      >
                        ✨
                      </motion.div>
                      <p className="text-biolum-cyan font-display text-xl glow-cyan">
                        Your message drifts into the void...
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <h2 className="font-display text-2xl text-white mb-1 glow-cyan">
                        A thought for the abyss
                      </h2>
                      <p className="text-white/40 text-sm font-body mb-6">
                        Anonymous. Ephemeral. Free.
                      </p>

                      <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, 280))}
                        onKeyDown={handleKeyDown}
                        placeholder="What's on your mind?"
                        className="w-full h-32 bg-void-900/50 rounded-xl p-4 text-white font-body placeholder:text-white/20 resize-none border border-white/5 focus:border-biolum-cyan/30 transition-colors"
                        autoFocus
                        disabled={isSubmitting}
                      />

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-white/30 font-mono">
                            {message.length}/280
                          </span>
                          {error && (
                            <span className="text-xs text-biolum-pink">
                              {error}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setIsOpen(false)}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors font-body"
                          >
                            Cancel
                          </button>
                          <motion.button
                            onClick={handleSubmit}
                            disabled={!message.trim() || isSubmitting}
                            className="px-6 py-2 rounded-lg bg-biolum-cyan/20 text-biolum-cyan text-sm font-body border border-biolum-cyan/30 disabled:opacity-30 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isSubmitting ? "Sending..." : "Release"}
                          </motion.button>
                        </div>
                      </div>

                      <p className="text-[10px] text-white/20 mt-4 text-center font-mono">
                        ⌘/Ctrl + Enter to send • Esc to close
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

