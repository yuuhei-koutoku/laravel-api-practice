"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import signupVerify, { SignupVerifyParams } from '@/services/auth/signupVerify'
import { useAuthContext } from '@/contexts/AuthContext'
import toast from "react-hot-toast";

const PageSignUpVerify = () => {
  const router = useRouter()
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const expires = searchParams.get('expires');
  const signature = searchParams.get('signature');
  if (id === null || expires === null || signature === null || isNaN(parseInt(id, 10)) || isNaN(parseInt(expires, 10))) {
    throw new Error('Required URL parameter is missing.');
  }
  const formData: SignupVerifyParams = {
    id: parseInt(id, 10),
    expires: parseInt(expires, 10),
    signature: signature,
  }

  const { signin } = useAuthContext()

  useEffect(() => {
    const signupVerifyInternal = async () => {
      try {
        const accessToken = await signupVerify(formData)
        signin(accessToken);

        const redirectPath = '/';
        router.push(redirectPath);
        toast.success('会員登録が完了しました！');
      } catch (error) {
        setIsFailed(true)
      }
    }
    signupVerifyInternal()
  }, []);

  if (!isFailed) {
    return (
      <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
        <div className="container mt-16 mb-16 text-center">
          <div>会員登録処理中...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container font-bold mt-16 mb-16 text-center text-red-500">
        <div>本登録処理に失敗しました。本登録用URLが正しいか確認してください。</div>
      </div>
    </div>
  );
};

export default PageSignUpVerify;