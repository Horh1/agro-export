import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const ADMIN_KEY = "agro-admin-2026";

function checkAuth(request: Request) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("key") === ADMIN_KEY;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  try {
    const section = await prisma.sectionInfo.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || "🌱",
        sortOrder: Number(body.sortOrder) || 0,
        link: body.link || null,
        images: Array.isArray(body.images) ? body.images : [],
      },
    });
    return NextResponse.json({ section });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.sectionInfo.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
