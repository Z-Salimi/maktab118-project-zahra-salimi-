"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/button";
import Link from "next/link";

export const PaymentComponent: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const processPayment = async () => {
      const paymentSuccess = Math.random() > 0;
      if (paymentSuccess) {
        // await clearCart('USER_ID');
        router.push("/products/cart/payment?status=success");
        toast.success("پرداخت شما با موفقیت انجام شد");
      } else {
        router.push("/products/cart/result?status=failure");
        toast.error("پرداخت ناموفق بود");
      }
    };

    processPayment();
  }, [router]);

  return (
    <section className="pt-14 p-4">
      <p className="text-2xl text-gray-700 font-bold my-8">
        در حال پردازش پرداخت شما...
      </p>
      <Link href={"/products/cart/result"}>
        <Button text={"ادامه"} />
      </Link>
    </section>
  );
};
