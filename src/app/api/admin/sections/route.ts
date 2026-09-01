import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_KEY = "agro-admin-2026";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const section = await prisma.sectionInfo.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || "🌱",
        sortOrder: Number(body.sortOrder) || 0,
        images: Array.isArray(body.images) ? body.images : [],
      },
    });
    return NextResponse.json({ section }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
