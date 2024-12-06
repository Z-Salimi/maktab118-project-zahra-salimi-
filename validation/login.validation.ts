import * as z from 'zod';

export const LoginSchema = z.object({
  userName: z.string().min(3,{ message: 'نام کاربری الزامی است' }),
  password: z.string().min(8, { message: 'پسورد حداقل 8 کاراکتر باید باشد' })
});
