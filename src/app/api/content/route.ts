import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const contents = await prisma.siteContent.findMany();
    return NextResponse.json({ contents });
  } catch {
    return NextResponse.json({ contents: [] });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== "agro-admin-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const contents = body.contents || [];

  try {
    for (const c of contents) {
      await prisma.siteContent.upsert({
        where: { key: c.key },
        update: { value: c.value },
        create: { key: c.key, value: c.value },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
