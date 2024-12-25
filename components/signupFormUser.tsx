// "use client";
// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { z, ZodSchema } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "./input";
// import { toast } from "react-toastify";
// import { SignupSchema } from "@/validation/signup.validation";
// import { signupRequest } from "@/apis/services/auth.service";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// interface IForm {
//   firstname: string;
//   lastname: string;
//   username: string;
//   password: string;
//   phoneNumber: string;
//   address: string;
// }

// export const SignupFormUser: React.FC = () => {
//   const router = useRouter();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IForm>({
//     resolver: zodResolver(SignupSchema),
//     mode: "all",
//   });

//   const onSubmit = async (data: IForm) => {
//     try {
//       await signupRequest(data);
//       toast.success("ثبت‌نام موفقیت‌آمیز بود");
//       router.push("/users/auth/login");
//     } catch (error) {
//       toast.error("ثبت‌نام ناموفق بود");
//       console.error("Signup failed:", error);
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <section className="bg-slate-200 flex flex-col justify-center items-center px-8 py-10 w-full h-screen md:w-[40vw] md:rounded-3xl md:h-fit">
//       <div className="flex flex-col gap-y-5">
//         <h2 className="font-bold text-4xl text-center text-gray-800">ثبت‌نام کاربر</h2>
//       </div>
//       <div className="w-full flex flex-col gap-y-5">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-full flex flex-col items-center gap-y-10 mt-20"
//         >
//           <Controller
//             control={control}
//             name="firstname"
//             render={({ field }) => (
//               <Input
//                 type="text"
//                 label="نام:"
//                 placeholder="نام"
//                 error={errors.firstname?.message}
//                 {...field}
//               />
//             )}
//           />
//           <Controller
//             control={control}
//             name="lastname"
//             render={({ field }) => (
//               <Input
//                 type="text"
//                 label="نام خانوادگی:"
//                 placeholder="نام خانوادگی"
//                 error={errors.lastname?.message}
//                 {...field}
//               />
//             )}
//           />
//           <Controller
//             control={control}
//             name="username"
//             render={({ field }) => (
//               <Input
//                 type="text"
//                 label="نام کاربری:"
//                 placeholder="نام کاربری"
//                 error={errors.username?.message}
//                 {...field}
//               />
//             )}
//           />
//           <Controller
//             control={control}
//             name="password"
//             render={({ field }) => (
//               <Input
//                 type="password"
//                 label="رمز عبور:"
//                 placeholder="رمز عبور"
//                 error={errors.password?.message}
//                 {...field}
//               />
//             )}
//           />
//           <Controller
//             control={control}
//             name="phoneNumber"
//             render={({ field }) => (
//               <Input
//                 type="text"
//                 label="شماره تلفن:"
//                 placeholder="شماره تلفن"
//                 error={errors.phoneNumber?.message}
//                 {...field}
//               />
//             )}
//           />
//           <Controller
//             control={control}
//             name="address"
//             render={({ field }) => (
//               <Input
//                 type="text"
//                 label="آدرس:"
//                 placeholder="آدرس"
//                 error={errors.address?.message}
//                 {...field}
//               />
//             )}
//           />
//           <div className="w-full flex flex-col justify-center items-center">
//             <button
//               className="bg-slate-700 hover:bg-slate-800 w-full mt-4 text-white font-semibold py-2 rounded-xl transition-all ease-in-out duration-500"
//               type="submit"
//             >
//               ثبت‌نام
//             </button>
//             <Link href="/users/auth/login">
//               <button
//                 className="transition-all ease-in-out duration-500 hover:bg-slate-300 w-full mt-4 text-gray-500 font-semibold p-2 rounded-xl"
//               >
//                 قبلاً ثبت‌نام کرده‌اید؟ ورود
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };
