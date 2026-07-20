import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = "dota2204@bk.ru";
const SENDER_EMAIL = "onboarding@resend.dev";

interface InquiryData {
  applicantType: string;
  companyName?: string | null;
  contactPerson: string;
  phone: string;
  email: string;
  interestedIn: string[];
  volume?: string | null;
  message?: string | null;
}

export async function sendInquiryEmail(inquiry: InquiryData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2 style="color: #166534;">Новая заявка с сайта Агро-Экспорт</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb; width: 180px;">Тип</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.applicantType === "company" ? "Компания" : "Физлицо"}</td>
        </tr>
        ${inquiry.companyName ? `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb;">Компания</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.companyName}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb;">Контакт</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.contactPerson}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb;">Телефон</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb;">Email</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb;">Интересует</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.interestedIn.join(", ")}</td>
        </tr>
        ${inquiry.volume ? `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb;">Объём</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.volume}</td>
        </tr>` : ""}
        ${inquiry.message ? `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9fafb;">Сообщение</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${inquiry.message}</td>
        </tr>` : ""}
      </table>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
        Заявка с сайта Агро-Экспорт. Дата: ${new Date().toLocaleString("ru-RU")}
      </p>
    </body>
    </html>
  `;

  const { data, error } = await resend.emails.send({
    from: `Агро-Экспорт <${SENDER_EMAIL}>`,
    to: [RECIPIENT_EMAIL],
    subject: `Новая заявка от ${inquiry.contactPerson} — ${inquiry.interestedIn.slice(0, 2).join(", ")}`,
    html,
    replyTo: inquiry.email,
  });

  if (error) {
    console.error("Resend error:", error);
    throw error;
  }

  console.log(`✅ Письмо отправлено на ${RECIPIENT_EMAIL}, ID: ${data?.id}`);
  return { success: true, id: data?.id };
}