import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().min(1, "نام کامل الزامی است"),
  phone: z.string().min(1, "شماره تماس الزامی است"),
  address: z.string().min(1, "آدرس الزامی است"),
  deliveryDate: z.date().refine(date => date !== null, {
    message: "تاریخ تحویل الزامی است"
  }),
});

export type ContactFormSchema = z.infer<typeof ContactFormSchema>;
