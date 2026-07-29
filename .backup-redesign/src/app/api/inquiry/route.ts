import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Валидация на сервере (даже если клиент обошли)
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Неверные данные", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { applicantType, companyName, contactPerson, phone, email, interestedIn, volume, message } = parsed.data;

    // Сохраняем в БД
    const inquiry = await prisma.inquiry.create({
      data: {
        applicantType,
        companyName: companyName || null,
        contactPerson,
        phone,
        email,
        interestedIn,
        volume: volume || null,
        message: message || null,
      },
    });

    // Отправка на email — обернём в try/catch, чтобы ошибка письма не роняла запрос
    try {
      const { sendInquiryEmail } = await import("@/lib/email");
      await sendInquiryEmail(inquiry);
    } catch (emailError) {
      console.error("Email sending failed (non-critical):", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Заявка отправлена" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/inquiry error:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке заявки" },
      { status: 500 }
    );
  }
}