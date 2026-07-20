import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products error:", String(error));
    return NextResponse.json(
      { error: "Ошибка при получении продуктов", details: String(error) },
      { status: 500 }
    );
  }
}
