import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_KEY = "agro-admin-2026";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log("Creating product:", body.name);

    const product = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category || "VEGETABLES",
        variety: body.variety || null,
        description: body.description || null,
        characteristics: body.characteristics || null,
        price: body.price || null,
        minOrder: body.minOrder || null,
        images: Array.isArray(body.images) ? body.images : [],
        isActive: body.isActive !== false,
      },
    });

    console.log("Created:", product.id);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error("CREATE ERROR:", error.message);
    return NextResponse.json(
      { error: "Ошибка создания: " + error.message },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
