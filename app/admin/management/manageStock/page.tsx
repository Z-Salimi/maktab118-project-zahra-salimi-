import { StockProductManage } from "@/container/StockProdutManage";

const ManageStock:React.FC =()=>{
    return(
        <section className=" w-full h-screen p-10 bg-backStock bg-no-repeat bg-cover">
      <StockProductManage />
    </section>
    )
}
export default ManageStock;