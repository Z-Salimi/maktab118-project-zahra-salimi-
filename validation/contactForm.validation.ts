// validationSchema.ts
import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().min(1, "نام کامل الزامی است"),
  email: z.string().email("ایمیل نامعتبر است").min(1, "ایمیل الزامی است"),
  phone: z.string().min(1, "شماره تماس الزامی است"),
  address: z.string().min(1, "آدرس الزامی است"),
  deliveryDate: z.date({ required_error: "تاریخ تحویل الزامی است" }).nullable(),
});

export type ContactFormSchema = z.infer<typeof ContactFormSchema>;
