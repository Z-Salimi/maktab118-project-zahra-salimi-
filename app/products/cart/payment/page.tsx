import { PaymentComponent } from "@/components/paymentComp";


const PaymentPage: React.FC = () => {
  return (
    <section className="pt-14 p-4 ">
      <h1 className="text-2xl text-gray-700 font-bold my-4">صفحه پرداخت</h1>
      <PaymentComponent />
    </section>
  );
};
export default PaymentPage;
