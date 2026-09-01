import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const sections = await prisma.sectionInfo.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ sections });
  } catch (error) {
    console.error("GET /api/sections error:", String(error));
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
