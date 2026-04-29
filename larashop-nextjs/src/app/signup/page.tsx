"use client" 

import React, { FC, useState } from "react";
import { useForm } from 'react-hook-form'
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import signup from '@/services/auth/signup'
import { useSignupContext } from "@/contexts/SignupContext";
import FormValidationError  from "@/types/FormValidationError";
import { hasError, getErrors } from "@/types/FormValidationError";
import toast from "react-hot-toast";

export type SignupFormData = {
  email: string
  password: string
}

const PageSignUp = () => {
  const router = useRouter()
  const { email, setEmail } = useSignupContext()

  const { register, handleSubmit, formState: { errors }, } = useForm<SignupFormData>()
  const [validationError, setValidationError] = useState<FormValidationError|null>(null);
  const onSubmit = async (data: SignupFormData) => {

    const { email, password } = data

    try {
      setValidationError(null)
      const signupParams = { email, password };
      await signup(signupParams);

      setEmail(email);
      const redirectPath = '/signup/confirm';
      router.push(redirectPath);
    } catch (error: unknown) {
      if (error instanceof FormValidationError) {
        setValidationError(error);
        toast.error('入力内容に誤りがあります。');
      } else {
        toast.error('新規会員登録に失敗しました');
      }
    }
  }

  return (
      <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            新規会員登録
          </h2>
          <div className="max-w-md mx-auto space-y-6 ">
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
                  className="mt-1" />
                { validationError && hasError(validationError, 'password') &&
                  getErrors(validationError, 'password').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
              </label>
              <ButtonPrimary type="submit">会員登録</ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              すでに会員登録済の方は
              <Link className="text-green-600" href="/login">
                こちらからログイン
              </Link>
            </span>
          </div>
        </div>
      </div>
  );
};

export default PageSignUp;
