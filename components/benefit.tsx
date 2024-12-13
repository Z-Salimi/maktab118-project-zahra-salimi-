import React from "react";
import { BenefitCard } from "./benefitCard";

export const Benefit:React.FC = ()=>{
 return(
    <section className="flex flex-col justify-center items-center gap-8 py-20">
        <h2 className="font-semibold text-2xl text-gray-700">مزیت های خرید از دیجی زرگر</h2>
        <div className="flex justify-around items-center gap-8 pt-2">
            <BenefitCard text="فاکتور معتبر طلا" src="/01.webp" />
            <BenefitCard text="امکان تعویض و عودت" src="/02.webp" />
            <BenefitCard text="ضمانت اصالت کالا" src="/03.webp" />
            <BenefitCard text="امنیت بالای خرید طلا" src="/04.webp" />
            <BenefitCard text="ساخت سفارشی طلا" src="/05.webp" />
            <BenefitCard text="خرید قسطی طلا" src="/06.webp" />
        </div>
    </section>
 )
}