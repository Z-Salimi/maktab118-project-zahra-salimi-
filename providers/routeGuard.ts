'use client';
import { useEffect } from 'react';
import { getToken } from '@/utils/session.managment';
import { usePathname, useRouter } from 'next/navigation';

interface IChild{
    children:any;
}
const RouteGuard = ({ children }:IChild) => {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    const token = getToken();
    if (!token && path.includes("admin")) {
      router.push('/admin/auth/login');
    }
  }, [router]);

  return children;
};

export default RouteGuard;
