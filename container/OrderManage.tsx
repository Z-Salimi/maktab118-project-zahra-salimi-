"use client";
import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { getOrders, updateDeliveryStatus } from "@/apis/services/order.service";
import { getUsers } from "@/apis/services/user.service";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "@/components/button";
import { useTokenExpiration } from "@/hooks/loginExp";

interface IUserOrderSummary {
  orderId: string;
  userId: string;
  userName: string;
  totalPrice: number;
  orderCount: number;
  lastOrderDate: string;
  deliveryStatus: boolean;
  userAddress:string;
  userPhone: number | string;
  deliveryDate: string | null;
}

export const OrderManage: React.FC = () => {
  useTokenExpiration();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [userOrderSummary, setUserOrderSummary] = useState<IUserOrderSummary[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      console.log('Fetching orders and users...');
      try {
        const [orderData, userData] = await Promise.all([getOrders(currentPage, ordersPerPage), getUsers()]);
        console.log('Fetched order data:', orderData);
        console.log('Fetched user data:', userData);
        
        const orders = orderData.data.orders;
        const users = Array.isArray(userData.users) ? userData.users : [];
        users.forEach(user => console.log('User:', user._id, user.firstname, user.lastname));

        const groupedOrders = groupOrdersByUser(orders, users);
        setUserOrderSummary(groupedOrders);

        setOrders(orders);
        setUsers(users);
        setTotalOrders(orderData.total);
        setLoading(false);
      } catch (error: any) {
        console.error("Error in fetchOrdersAndUsers:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchOrdersAndUsers();
  }, [currentPage]);

  const groupOrdersByUser = (orders: IOrder[], users: IUser[]): IUserOrderSummary[] => {
    const userOrdersMap: Record<string, IUserOrderSummary> = {};
  
    orders.forEach((order) => {
      if (!userOrdersMap[order.user]) {
        const user = users.find((u) => u._id === order.user);
        const userName = user ? `${user.firstname} ${user.lastname}` : 'نامشخص';
        const userAddress = user?.address || 'نامشخص';
        const userPhone = user?.phoneNumber || 'نامشخص';
  
        userOrdersMap[order.user] = {
          orderId: order._id,
          userId: order.user,
          userName,
          userAddress,
          userPhone,
          totalPrice: 0,
          orderCount: 0,
          lastOrderDate: order.createdAt,
          deliveryStatus: order.deliveryStatus,
          deliveryDate: order.deliveryDate,
        };
      } else {
        if (new Date(order.createdAt) > new Date(userOrdersMap[order.user].lastOrderDate)) {
          userOrdersMap[order.user].lastOrderDate = order.createdAt;
        }
      }
      userOrdersMap[order.user].totalPrice += order.totalPrice;
      userOrdersMap[order.user].orderCount += 1;
      userOrdersMap[order.user].deliveryStatus = userOrdersMap[order.user].deliveryStatus && order.deliveryStatus;
    });
  
    return Object.values(userOrdersMap);
  };
  

  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  console.log('Total pages:', totalPages);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStatusChange = async (orderId: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await updateDeliveryStatus(orderId, newStatus);
      setUserOrderSummary((prevSummaries) =>
        prevSummaries.map((summary) =>
          summary.orderId === orderId ? { ...summary, deliveryStatus: newStatus } : summary
        )
      );
    } catch (error) {
      console.error("Error updating delivery status", error);
    }
  };

  const filteredOrders = userOrderSummary.filter((summary) => {
    if (filter === 'all') return true;
    if (filter === 'delivered') return summary.deliveryStatus;
    if (filter === 'notDelivered') return !summary.deliveryStatus;
    return true;
  });

  console.log("111:", filteredOrders)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flex flex-col py-10 w-full h-[90vh] items-center">
      <div className="flex justify-between">
        <h2 className="hidden md:flex pl-20 font-bold p-2 text-white">مدیریت موجودی و قیمت ها</h2>
        <div className="flex justify-center items-center mb-4 gap-4">
          <Button
            text="همه"
            className={`px-1.5 md:px-4 md:py-2 ${filter === 'all' ? 'bg-sky-600 text-white' : 'bg-sky-200 text-sky-700'} rounded-md`}
            onClick={() => setFilter('all')}
          />
          <Button
            text="تحویل داده شده"
            className={`px-1 md:px-4 md:py-2 ${filter === 'delivered' ? 'bg-sky-600 text-white' : 'bg-sky-200 text-sky-700'} rounded-md`}
            onClick={() => setFilter('delivered')}
          />
          <Button
            text="تحویل داده نشده"
            className={`px-1 md:px-4 md:py-2 ${filter === 'notDelivered' ? 'bg-sky-600 text-white' : 'bg-sky-200 text-sky-700'} rounded-md`}
            onClick={() => setFilter('notDelivered')}
          />
        </div>
      </div>
      <div className="flex justify-center rounded-lg w-full">
        <div className="w-full text-sm text-center">
          <table className="w-full bg-white">
            <thead className="text-[16px] text-gray-700 bg-slate-300 w-full table">
              <tr className="grid grid-cols-9">
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm">نام کاربر</th>
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm">تلفن</th>
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm">آدرس</th>
                <th className="px-6 py-3 border-x-2 border-gray-300 cursor-pointer text-xs md:text-sm">مجموع قیمت</th>
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm">تعداد سفارش‌ها</th>
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm">آخرین تاریخ سفارش</th>
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm"> تاریخ تحویل</th>
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm">تحویل داده شده</th>
                <th className="px-6 py-3 cursor-pointer text-xs md:text-sm"> تغییر وضعیت به</th>
              </tr>
            </thead>
            <tbody className="bg-slate-50 h-[55vh] overflow-auto block w-full">
              {filteredOrders.map((summary) => (
                <tr
                  key={summary.userId}
                  className="border-b-2 border-gray-300 w-full  grid grid-cols-9"
                >
                  <td className="px-6 py-4 text-xs md:text-sm">
                    {summary.userName}
                  </td>
                  <td className="px-6 py-4 border-x-2 text-xs md:text-sm flex justify-center items-center">{summary.userPhone}</td>
                  <td className="px-6 py-4 border-x-2 text-xs md:text-sm flex justify-center items-center flex-wrap">{summary.userAddress}</td>
                  <td className="px-6 py-4 border-x-2 text-xs md:text-sm flex justify-center items-center">{summary.totalPrice}</td>
                  <td className="px-6 py-4 text-xs md:text-sm">{summary.orderCount}</td>
                  <td className="px-6 py-4 border-x-2 text-xs md:text-sm flex justify-center items-center">
                    {moment(summary.lastOrderDate).format('jYYYY/jMM/jDD')}
                  </td>
                  <td className="px-6 py-4 border-x-2 text-xs md:text-sm flex justify-center items-center">
                    {moment(summary.deliveryDate).format('jYYYY/jMM/jDD')}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm">{summary.deliveryStatus ? "بله" : "خیر"}</td>
                  <td className="px-6 py-4 border-r-2 text-xs md:text-sm">
                    <button
                    onClick={()=>handleStatusChange(summary.orderId,summary.deliveryStatus)}
                    className="bg-slate-300 px-4 py-2 rounded-lg">{summary.deliveryStatus ? "خیر" : "بله"}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center gap-4 py-2 bg-slate-300">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-white shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray] ${
                currentPage === 1
                  ? "bg-slate-400"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              <FaAngleDoubleRight />
            </button>
            <span>
              صفحه {currentPage} از {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-white shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray] ${
                currentPage === totalPages
                  ? "bg-gray-400"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              <FaAnglesLeft />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
