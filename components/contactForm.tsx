"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { DatePicker } from "zaman";
import moment from "moment-jalaali";
import { ContactFormSchema } from "@/validation/contactForm.validation";
import axios from "axios";
import Link from "next/link";
import { createOrder } from "@/apis/services/order.service";

export const ContactForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(ContactFormSchema),
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const data = response.data;
        setValue("fullName", data.fullName);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("address", data.address);
        setValue("deliveryDate", moment(data.deliveryDate).toDate());
      } catch (error) {
        console.error("Error fetching user info", error);
      }
    };
    fetchUserInfo();
  }, [userId, setValue]);

  const onSubmit = async (data: ContactFormSchema) => {
    try {
      
      const orderData = {
        user: userId,
        products: JSON.parse(localStorage.getItem("cartItems") || "[]"),
        deliveryDate: data.deliveryDate,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };
      const response = await createOrder(orderData); 
      console.log("Order created:", response);
      window.location.href = "/products/cart/payment";
    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  const minDate = moment();
  const maxDate = moment().add(2, "months");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 border border-slate-300 bg-slate-50 rounded-lg  w-[50vw] px-8 py-4 text-sm shadow-md"
    >
      <div className="w-full">
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <Input
              type="text"
              className="w-full"
              label="نام کامل:"
              placeholder="نام کامل"
              error={errors.fullName?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              type="email"
              className="w-full"
              label="ایمیل:"
              placeholder="ایمیل"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full">
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              type="text"
              className="w-full"
              label="شماره تماس:"
              placeholder="شماره تماس"
              error={errors.phone?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full">
        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <Input
              type="text"
              className="w-full"
              label="آدرس:"
              placeholder="آدرس"
              error={errors.address?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full">
        <Controller
          control={control}
          name="deliveryDate"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="text-slate-700">تاریخ تحویل:</label>
              <DatePicker
                value={field.value}
                onChange={({ value }) => field.onChange(value)}
                timePicker={false}
                className="border border-slate-300 bg-slate-50 rounded-lg md:max-w-[40vw] w-full px-3 py-1.5 text-sm shadow-md"
                min={minDate}
                max={maxDate}
              />
              {errors.deliveryDate && (
                <p className="text-red-600">{errors.deliveryDate.message}</p>
              )}
            </div>
          )}
        />
      </div>
      <Link href={"/products/cart/payment"}>
        <button
          type="submit"
          className="bg-gray-600 px-6 py-1 rounded-xl w-full text-gray-100 font-semibold border-r-2 border-b-2 border-gray-100 shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
        >
          ارسال
        </button>
      </Link>
    </form>
  );
};
