"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { toast } from "react-toastify";
import { LoginSchema } from "@/validation/login.validation";
import { loginRequest } from "@/apis/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IForm {
  userName: string;
  password: string;
}

export const LoginFormUser: React.FC = () => {
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
      const { token, role } = await loginRequest(data.userName, data.password);
      if (role !== "USER") {
        toast.error("شما اجازه دسترسی به این سیستم را ندارید");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      router.push("/");
      toast.success("خوش آمدید");
    } catch (error) {
      toast.error("ورود ناموفق بود");
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="bg-slate-200 flex flex-col justify-center items-center px-8 py-10 w-full h-screen md:w-[40vw] md:rounded-3xl md:h-fit">
      <div className="flex flex-col gap-y-5">
        <h2 className="font-bold text-4xl text-center text-gray-800">ورود کاربر</h2>
      </div>
      <div className="w-full flex flex-col gap-y-5">
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
          <div className="w-full flex flex-col justify-center items-center">
            <button
            className="bg-slate-700 hover:bg-slate-800 w-full mt-4 text-white font-semibold py-2 rounded-xl transition-all ease-in-out duration-500"
            type="submit"
          >
            ورود
          </button>
          <Link href={"/users/auth/signup"}>
          <button
            className="transition-all ease-in-out duration-500 hover:bg-slate-300 w-full mt-4 text-gray-500 font-semibold p-2 rounded-xl"
          >
           تاکنون ثبت نام نکرده اید؟ ثبت نام کنید
          </button>
          </Link>
          </div>
          
          <div className="flex justify-center items-center gap-4">
          <Link href="/admin/auth/login">
            <button className="bg-slate-100 whitespace-nowrap hover:bg-slate-300 w-full px-6 text-gray-600 font-semibold py-2 rounded-xl transition-all ease-in-out duration-500">
              ورود مدیریت
            </button>
          </Link>
            <Link href="/">
            <button className="bg-slate-100 whitespace-nowrap hover:bg-slate-300 w-full px-6 text-gray-600 font-semibold py-2 rounded-xl transition-all ease-in-out duration-500">
              برگشت به صفحه اصلی
            </button>
          </Link>
          </div>
          
        </form>
      </div>
    </section>
  );
};
