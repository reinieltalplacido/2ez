import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    src: "/Drake - What Did I Miss_ (Lyrics).mp3",
    title: "What Did I Miss?",
    artist: "Drake",
    volume: 0.15,
    autoplay: true,
  });
}
