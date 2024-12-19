import { CartPageContainer } from "@/container/CartPageContainer";

const CartPage: React.FC = () => {
  return (
    <section className="pt-14 px-4">
      <h1 className="text-2xl text-gray-700 font-bold mb-8">سبد خرید</h1>
      <CartPageContainer />
    </section>
  );
};
export default CartPage;
