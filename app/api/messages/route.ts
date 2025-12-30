import { getDb, schema } from "@/lib/db";
import { isContentSafe } from "@/lib/moderation";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

const COLORS = ["cyan", "teal", "purple", "pink", "blue"] as const;

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const db = getDb();
    const allMessages = await db
      .select()
      .from(schema.messages)
      .orderBy(desc(schema.messages.createdAt))
      .limit(100);

    return NextResponse.json(allMessages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { error: `Database error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const trimmedContent = content.trim().slice(0, 280);

    if (trimmedContent.length === 0) {
      return NextResponse.json(
        { error: "Content cannot be empty" },
        { status: 400 }
      );
    }

    const moderationResult = isContentSafe(trimmedContent);
    if (!moderationResult.safe) {
      return NextResponse.json(
        { error: moderationResult.reason || "Message not allowed" },
        { status: 400 }
      );
    }

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const depth = Math.floor(Math.random() * 5) + 1;

    const db = getDb();
    const [newMessage] = await db
      .insert(schema.messages)
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
      { error: `Database error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    );
  }
}

