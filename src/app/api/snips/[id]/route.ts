import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const currentUser = params.id;

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snippets = await prisma.snipData.findMany({
      where: { userId: currentUser },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
