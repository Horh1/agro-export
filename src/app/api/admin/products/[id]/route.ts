import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ADMIN_KEY = "agro-admin-2026";

function checkAuth(request: Request) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("key") === ADMIN_KEY;
}

const productUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  category: z.enum(["VEGETABLES", "GRAINS"]).optional(),
  description: z.string().max(2000).optional().nullable(),
  price: z.string().max(50).optional().nullable(),
  imageUrl: z.string().max(500).optional().nullable(),
  isActive: z.boolean().optional(),
});

// PATCH — обновить товар
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = productUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Неверные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
  }
}

// DELETE — удалить товар
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