'use client'
import { useEffect } from 'react';
import { getToken, clearToken } from '@/utils/session.managment';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useTokenExpiration = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/admin/auth/login');
      return;
    }
  
      setTimeout(() => {
        toast.error('Logout.Please login again!');
        clearToken();
        router.push('/admin/auth/login');
      }, 600000);
  }, [router]);
};

