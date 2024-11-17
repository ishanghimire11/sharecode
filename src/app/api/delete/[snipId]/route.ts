import { NextResponse } from "next/server";
// File: /api/delete/[snipId]/route.ts
import prisma from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { snipId: string } }
) {
  try {
    const { snipId } = params;

    await prisma.snipData.delete({
      where: { id: snipId },
    });

    return NextResponse.json(
      { message: "Snippet deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting snippet:", err);
    return NextResponse.json({ message: "Snippet not found" }, { status: 404 });
  }
}
