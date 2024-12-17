import { z } from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(1, "نام کالا نباید خالی باشد"),
  price: z.number().min(3000000, "قیمت کالا باید بالاي 3 ميليون باشد"),
  quantity: z.number().min(0, "تعداد کالا باید عددی مثبت باشد"),
  images: z.instanceof(FileList).optional(),
});
