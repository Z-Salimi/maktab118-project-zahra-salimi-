"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { toast } from "react-toastify";
import { LoginSchema } from "@/validation/login.validation";
import { loginRequest } from "@/apis/services/auth.service";
import { all } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IForm {
  userName: string;
  password: string;
}
export const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const onSubmit = async (data: IForm) => {
    try {
      const token = await loginRequest(data.userName, data.password);
      router.push("/admin/management/manageProduct");
      toast.success("ورود موفقیت آمیز بود");
    } catch (error) {
      toast.error("ورود با شکست مواجه شد");
      console.error("Login failed:", error);
    }
  };
  return (
    <section className="bg-slate-200 flex flex-col justify-center items-center px-8 py-10 w-full h-screen md:w-[40vw] md:rounded-3xl md:h-fit">
      <div className="flex flex-col gap-y-10">
        <h2 className="font-bold text-4xl text-center text-gray-800">
          ورود به پنل مدیریت
        </h2>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-y-10 mt-20"
        >
          <Controller
            control={control}
            name="userName"
            render={({ field }) => (
              <Input
                type="text"
                label="نام کاربری:"
                placeholder="نام کاربری"
                error={errors.userName?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                type="password"
                label="رمز عبور:"
                placeholder="رمز عبور"
                error={errors.password?.message}
                {...field}
              />
            )}
          />
          <button
            className="bg-slate-700 hover:bg-slate-800 w-full mt-4 text-white font-semibold py-2 rounded-xl"
            type="submit"
          >
            ورود
          </button>
          <Link href={'/'} >
          <button
            className="= hover:bg-slate-300 w-full px-6 text-gray-600 font-semibold py-2 rounded-xl"
            
          >
            برگشت به صفحه اصلی
          </button>
          </Link>
        </form>
      </div>
    </section>
  );
};
