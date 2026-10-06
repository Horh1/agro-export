import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_KEY = "agro-admin-2026";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const options = await prisma.productOption.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ options });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  try {
    const option = await prisma.productOption.create({
      data: {
        name: body.name,
        sortOrder: Number(body.sortOrder) || 0,
        isActive: body.isActive !== false,
      },
    });
    return NextResponse.json({ option }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
