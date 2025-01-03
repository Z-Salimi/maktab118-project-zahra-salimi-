'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { PaymentResult } from './paymentResult';
import { toast } from 'react-toastify';

export const PaymentComponent: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const processPayment = async () => {
      const paymentSuccess = Math.random() > 0.5;
      if (paymentSuccess) {
        // await clearCart('USER_ID'); 
        router.push('/products/cart/payment?status=success');
        toast.success('پرداخت شما با موفقیت انجام شد');
      } else {
        router.push('/products/cart/result?status=failure');
        toast.error('پرداخت ناموفق بود')
      }
    };

    processPayment();
  }, [router]);

  return (
    <section className="pt-14 p-4">
      {/* <p className="text-2xl text-gray-700 font-bold my-4">در حال پردازش پرداخت شما...</p> */}
      <PaymentResult />
    </section>
  );
};

