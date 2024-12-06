import { OrderManage } from "@/container/OrderManage";

const OrdersManagement:React.FC =()=>{
    return(
        <section className=" w-full h-screen p-10 bg-backOrder bg-no-repeat bg-cover">
      <OrderManage />
    </section>
    )
}
export default OrdersManagement;