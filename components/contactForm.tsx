"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { DatePicker } from "zaman";
import moment from "moment-jalaali";
import { ContactFormSchema } from "@/validation/contactForm.validation";
import { getUserInfo } from "@/apis/services/user.service";
import { createOrder } from "@/apis/services/order.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCart, clearCart } from "@/apis/services/cart.service";

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface IContactForm {
  fullName: string;
  phone: string;
  address: string;
  deliveryDate: Date | null;
}

export const ContactForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IContactForm>({
    resolver: zodResolver(ContactFormSchema),
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userId) {
          const data = await getUserInfo(userId);
          console.log("User info fetched:", data);
          
          setValue("fullName", `${data.data.user.firstname} ${data.data.user.lastname}`);
          setValue("phone", data.data.user.phoneNumber);
          setValue("address", data.data.user.address);
        }
      } catch (error) {
        console.error("Error fetching user info", error);
      }
    };
    fetchUserInfo();
  }, [userId, setValue]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (userId) {
          const cart = await getCart(userId);
          console.log("Cart items fetched:", cart.cart.products);
          setCartItems(cart.cart.products);
        }
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };
    fetchCartItems();
  }, [userId]);

  const onSubmit = async (data: IContactForm) => {
    console.log("onSubmit called with data:", data);
    const deliveryDate = data.deliveryDate ? moment(data.deliveryDate).toDate() : moment().add(1, 'week').toDate();
    console.log("onSubmitttttt:", deliveryDate);

    if (moment(deliveryDate).isAfter(moment().add(1, 'month'))) {
      console.error("Delivery date cannot be more than one month from today.");
      toast.error("تاریخ تحویل نمی‌تواند بیشتر از یک ماه از امروز باشد.");
      return;
    }

    if (moment(deliveryDate).isSameOrBefore(moment(), 'day')) {
      console.error("Delivery date cannot be today or before.");
      toast.error("تاریخ تحویل نمی‌تواند امروز یا قبل از امروز باشد.");
      return;
    }

    try {
      const orderData = {
        user: userId!,
        products: cartItems.map(item => ({
          product: item.product._id,
          count: item.quantity
        })),
        deliveryStatus: false,
        deliveryDate: deliveryDate.toISOString()
      };

      console.log("Order data to be sent:", orderData);
      const response = await createOrder(orderData);
      console.log("Order created:", response);

      await clearCart(userId!);

      localStorage.removeItem("products");

      router.push("/products/cart/payment");
    } catch (error) {
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      console.error("Error creating order", error);
    }
  };

  const minDate = moment();
  const maxDate = moment().add(1, "month");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 border border-slate-300 bg-slate-50 rounded-lg w-[50vw] px-8 py-4 text-sm shadow-md"
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
      
      <button
        type="submit"
        className="bg-gray-600 px-6 py-1 rounded-xl w-full text-gray-100 font-semibold border-r-2 border-b-2 border-gray-100 shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
      >
        ارسال
      </button>
    </form>
  );
};
