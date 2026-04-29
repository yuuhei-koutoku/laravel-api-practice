import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext'
import toast from "react-hot-toast";

export function useRequireLogin() {
  const { authUser, isLoaded } = useAuthContext()
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoaded) {
        return;
    }

    if (!authUser) {
        // 未ログイン時はリダイレクト
        toast.error('ログインしてください');
        router.push("/login");
    }

  }, [router, isLoaded, authUser])

  return authUser !== null
}