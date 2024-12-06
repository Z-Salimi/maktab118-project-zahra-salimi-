
import Link from "next/link";

export const NavbarManagement: React.FC = () => {
  return (
    <section>
      <div className="flex flex-col items-start  text-lg text-gray-700 font-semibold bg-gray-200  w-[25vw] h-screen">
        <img src="/digizarger.png" alt="Logo" className="w-64 mt-4" />
        <div className="shadow-md mb-3  w-[25vw]">
          <Link href={"/"}>
            <button className="bg-gray-200 mt-10 rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100">
              صفحه اصلی
            </button>
          </Link>
        </div>
        <div className="shadow-md mb-3  w-[25vw]">
          <Link href={"/admin/management/manageProduct"}>
            <button className="bg-gray-200 rounded-md  w-full p-6  transition-all ease-in-out duration-500 hover:bg-slate-100">
              مدیریت محصولات
            </button>
          </Link>
        </div>
        <div className="shadow-md mb-3  w-[25vw]">
          <Link href={"/admin/management/manageStock"}>
            <button className="bg-gray-200  rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100">
              مدیریت موجودی و قیمت
            </button>
          </Link>
        </div>
        <div className="shadow-md mb-3  w-[25vw]">
          <Link href={"/admin/management/orders"}>
            <button className="bg-gray-200  rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100">
              مدیریت سفارش ها
            </button>
          </Link>
        </div>
      </div>

      {/* <div className="w-full h-screen">
        <img src="/img9.jpg" className="w-full h-full" alt="" />
      </div> */}
    </section>
  );
};
