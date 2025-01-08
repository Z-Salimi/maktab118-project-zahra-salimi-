'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const PaymentResult: React.FC = () => {
  const router = useRouter();
  const param = usePathname();
  const statusS  = param.includes('success');
//   if(statusS){
//     toast.success('پرداخت شما با موفقیت انجام شد')
//   }else{
//     toast.error('پرداخت ناموفق بود')
//   }
//   const statusF  = param.includes('failure');

  return (
    <section className="">
      <h1 className="text-2xl text-gray-700 font-bold my-4">
        {!statusS ? 'پرداخت موفق' : 'پرداخت ناموفق'}
      </h1>
      <p>
        {!statusS
          ? 'پرداخت شما با موفقیت انجام شد       .'
          : 'پرداخت شما انجام نشد، لطفاً دوباره تلاش کنید.'}
      </p>
      <Link href="/">
        <button className="px-4 py-3 bg-green-700 text-white rounded-xl mt-7">بازگشت به محصولات</button>
      </Link>
    </section>
  );
};

