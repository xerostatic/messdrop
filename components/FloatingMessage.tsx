"use client";

import { motion } from "framer-motion";
import { Message } from "@/lib/db/schema";

interface FloatingMessageProps {
  message: Message;
  index: number;
  total: number;
}

const colorClasses = {
  cyan: {
    text: "text-biolum-cyan",
    glow: "glow-cyan",
    boxGlow: "box-glow-cyan",
    border: "border-biolum-cyan/20",
  },
  teal: {
    text: "text-biolum-teal",
    glow: "glow-teal",
    boxGlow: "box-glow-teal",
    border: "border-biolum-teal/20",
  },
  purple: {
    text: "text-biolum-purple",
    glow: "glow-purple",
    boxGlow: "box-glow-purple",
    border: "border-biolum-purple/20",
  },
  pink: {
    text: "text-biolum-pink",
    glow: "glow-pink",
    boxGlow: "box-glow-pink",
    border: "border-biolum-pink/20",
  },
  blue: {
    text: "text-biolum-blue",
    glow: "glow-blue",
    boxGlow: "box-glow-blue",
    border: "border-biolum-blue/20",
  },
};

const depthClasses = [
  "depth-1 text-base",
  "depth-2 text-sm",
  "depth-3 text-sm",
  "depth-4 text-xs",
  "depth-5 text-xs",
];

const depthScales = [1, 0.9, 0.8, 0.7, 0.6];

export function FloatingMessage({ message, index, total }: FloatingMessageProps) {
  const colors = colorClasses[message.color as keyof typeof colorClasses] || colorClasses.cyan;
  const depthClass = depthClasses[message.depth - 1] || depthClasses[0];
  const scale = depthScales[message.depth - 1] || 1;

  // Create a pseudo-random but deterministic position based on message properties
  const seed = message.id * 1000 + index;
  const randomX = ((seed * 9301 + 49297) % 233280) / 233280;
  const randomY = ((seed * 7621 + 67823) % 233280) / 233280;

  // Distribute messages across the screen
  const startX = 5 + randomX * 70; // 5-75% from left
  const startY = 10 + randomY * 70; // 10-80% from top

  // Animation durations based on depth (deeper = slower)
  const floatDuration = 15 + message.depth * 5 + (randomX * 10);
  const glowDuration = 3 + message.depth;

  return (
    <motion.div
      className={`absolute ${depthClass}`}
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        transform: `scale(${scale})`,
        zIndex: 10 - message.depth,
      }}
      initial={{ opacity: 0, scale: scale * 0.8 }}
      animate={{
        opacity: 1,
        scale: scale,
        y: [0, -15 - message.depth * 3, 5, -20, 0],
        x: [0, 10, -5, 8, 0],
      }}
      transition={{
        opacity: { duration: 1.5, delay: index * 0.1 },
        scale: { duration: 1.5, delay: index * 0.1 },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: randomY * 5,
        },
        x: {
          duration: floatDuration * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: randomX * 3,
        },
      }}
    >
      <motion.div
        className={`message-card px-4 py-3 rounded-xl border ${colors.border} max-w-xs cursor-default select-none`}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
        animate={{
          boxShadow: [
            `0 0 15px ${getGlowColor(message.color, 0.2)}`,
            `0 0 25px ${getGlowColor(message.color, 0.4)}`,
            `0 0 15px ${getGlowColor(message.color, 0.2)}`,
          ],
        }}
        transition={{
          boxShadow: {
            duration: glowDuration,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <p className={`font-body ${colors.text} leading-relaxed`}>
          {message.content}
        </p>
        <p className="text-[10px] text-white/20 mt-2 font-mono">
          {formatTimeAgo(message.createdAt)}
        </p>
      </motion.div>
    </motion.div>
  );
}

function getGlowColor(color: string, opacity: number): string {
  const colors: Record<string, string> = {
    cyan: `rgba(34, 211, 238, ${opacity})`,
    teal: `rgba(45, 212, 191, ${opacity})`,
    purple: `rgba(167, 139, 250, ${opacity})`,
    pink: `rgba(244, 114, 182, ${opacity})`,
    blue: `rgba(96, 165, 250, ${opacity})`,
  };
  return colors[color] || colors.cyan;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const messageDate = new Date(date);
  const seconds = Math.floor((now.getTime() - messageDate.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return messageDate.toLocaleDateString();
}

