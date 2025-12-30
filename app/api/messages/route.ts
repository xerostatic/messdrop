import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { isContentSafe } from "@/lib/moderation";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

const COLORS = ["cyan", "teal", "purple", "pink", "blue"] as const;

export async function GET() {
  try {
    const allMessages = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(100);

    return NextResponse.json(allMessages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const trimmedContent = content.trim().slice(0, 280); // Max 280 chars like tweets

    if (trimmedContent.length === 0) {
      return NextResponse.json(
        { error: "Content cannot be empty" },
        { status: 400 }
      );
    }

    // Content moderation check
    const moderationResult = isContentSafe(trimmedContent);
    if (!moderationResult.safe) {
      return NextResponse.json(
        { error: moderationResult.reason || "Message not allowed" },
        { status: 400 }
      );
    }

    // Random color and depth for visual variety
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const depth = Math.floor(Math.random() * 5) + 1;

    const [newMessage] = await db
      .insert(messages)
      .values({
        content: trimmedContent,
        color,
        depth,
      })
      .returning();

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Failed to create message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

