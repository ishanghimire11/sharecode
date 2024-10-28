import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    console.log(`User ID retrieved: ${userId}`);

    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const snippets = await prisma.snipData.findMany({
      where: { id: userId },
    });

    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Error in GET function:", error);

    if (error instanceof Error && error.message === "No user ID found") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, language, code } = await request.json();

  try {
    const uniqueName = await prisma.snipData.findFirst({
      where: { name: name },
    });
    if (uniqueName) {
      return NextResponse.json({
        error: "Name already exists. Please provide a unique name",
      });
    }
    const snippet = await prisma.snipData.create({
      data: {
        name,
        description,
        language,
        code,
        userId,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(snippet);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error saving the data" },
      { status: 500 }
    );
  }
}
