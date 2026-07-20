import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_KEY = "agro-admin-2026";

function checkAuth(request: Request) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("key") === ADMIN_KEY;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        category: body.category,
        variety: body.variety || null,
        description: body.description || null,
        characteristics: body.characteristics || null,
        price: body.price || null,
        minOrder: body.minOrder || null,
        images: Array.isArray(body.images) ? body.images : [],
        isActive: body.isActive !== false,
      },
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
  }
}
