import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const options = await prisma.productOption.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ options });
  } catch {
    return NextResponse.json({ options: [] });
  }
}
