"use client" 

import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import FormValidationError  from "@/types/FormValidationError";
import { hasError, getErrors } from "@/types/FormValidationError";
import toast from "react-hot-toast";

export type LoginFormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const { attempt, signin } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()
  const [validationError, setValidationError] = useState<FormValidationError|null>(null);
  const onSubmit = async (data: LoginFormData) => {

    const { email, password } = data

    try {
      const accessToken = await attempt(email, password);
      if (accessToken === null) {
        throw new Error('アクセストークンの取得に失敗しました。');
      }

      setValidationError(null);
      signin(accessToken);
      const redirectPath = '/';
      router.push(redirectPath);
      toast.success('ログインしました');
    } catch (error: unknown) {
      if (error instanceof FormValidationError) {
        setValidationError(error);
        toast.error('入力内容に誤りがあります。');
      } else {
        toast.error('ログインに失敗しました');
      }
    }
  }

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          ログイン
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                メールアドレス
              </span>
              <Input
                {...register('email', {})}
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
              { validationError && hasError(validationError, 'email') &&
                getErrors(validationError, 'email').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                パスワード
              </span>
              <Input
                {...register('password', {})}
                type="password"
                className="mt-1"
              />
              { validationError && hasError(validationError, 'password') &&
                getErrors(validationError, 'password').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
            </label>
            <ButtonPrimary type="submit">ログイン</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            <Link className="text-green-600" href="/signup">
              新規会員登録はこちらから
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;