import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

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

