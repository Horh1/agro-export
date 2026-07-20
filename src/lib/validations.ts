import { z } from "zod";

export const inquirySchema = z.object({
  applicantType: z.enum(["individual", "company"], {
    required_error: "Выберите тип заявителя",
  }),
  companyName: z.string().optional(),
  contactPerson: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(100, "Максимум 100 символов"),
  phone: z
    .string()
    .min(6, "Введите корректный телефон")
    .max(20, "Слишком длинный номер"),
  email: z.string().email("Введите корректный email"),
  interestedIn: z
    .array(z.string())
    .min(1, "Выберите хотя бы одну позицию"),
  volume: z.string().optional(),
  message: z.string().max(2000, "Максимум 2000 символов").optional(),
  // reCAPTCHA token — добавим позже
  // recaptchaToken: z.string().min(1, "Проверка не пройдена"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;