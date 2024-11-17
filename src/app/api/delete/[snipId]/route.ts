// File: /api/delete/[snipId]/route.ts

import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { snipId: string } }
) {
  try {
    const { snipId } = params;
    console.log(snipId, "delete snip id");

    // Example deletion logic with Prisma
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
