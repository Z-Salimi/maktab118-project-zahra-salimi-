import { PaymentResult } from "@/components/paymentResult";

const ResultPage: React.FC = () => {
  return (
    <section className="pt-14 p-4 w-full">
      <h1 className="text-2xl text-gray-700 font-bold my-4">نهایی کردن خرید</h1>
      <PaymentResult />
    </section>
  );
};
export default ResultPage;
