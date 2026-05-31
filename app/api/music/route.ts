import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract search query from URL (e.g. ?query=Uncle+Dags)
  // If no query is provided, we default to the song requested
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "Uncle Dags ORIGIMAL";

  return NextResponse.json({
    src: "/Uncle Dags - ORIGIMAL (feat. RJD).mp3",
    title: "ORIGIMAL (feat. RJD)",
    artist: "Uncle Dags",
    volume: 0.15,
    autoplay: true,
  });

}
