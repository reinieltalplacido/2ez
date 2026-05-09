import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const COUNTER_KEY = "profile:views";

export async function GET() {
  try {
    const count = await redis.get<number>(COUNTER_KEY);
    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { increment } = body;
    
    if (increment) {
      const newCount = await redis.incr(COUNTER_KEY);
      return NextResponse.json({ count: newCount });
    }
    
    const count = await redis.get<number>(COUNTER_KEY);
    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
