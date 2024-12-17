import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "نام کالا نباید خالی باشد"),
  description: z.string().min(3, "توضیحات کالا نباید خالی باشد"),
  brand: z.string().min(1, "برند کالا نباید خالی باشد"),
  category: z.string().min(1, "دسته بندی کالا نباید خالی باشد"),
  subCategory: z.string().min(1, "زیردسته بندی کالا نباید خالی باشد"),
  price: z.number().min(3000000, "قیمت کالا باید بالاي 3 ميليون باشد"),
  quantity: z.number().min(0, "تعداد کالا باید عددی مثبت باشد"),
  images: z.instanceof(FileList).optional(),
});
