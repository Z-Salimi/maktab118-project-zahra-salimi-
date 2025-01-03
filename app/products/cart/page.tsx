import { CartComponent } from "@/components/cartComp";
import { CartPageContainer } from "@/container/CartPageContainer";
import { UserProvider } from "@/providers/userProvider";

const CartPage: React.FC = () => {
  

  return (
    (
        <section className="pt-14 px-4 flex flex-col items-center">
          <h1 className="text-2xl text-gray-700 font-bold mb-8">سبد خرید</h1>
          <CartComponent />
          {/* <CartPageContainer /> */}
        </section>
    )
  );
};
export default CartPage;
