"use client"

import Label from "@/components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import FormValidationError  from "@/types/FormValidationError";
import { hasError, getErrors } from "@/types/FormValidationError";
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { useAuthContext } from '@/contexts/AuthContext'

import putMe from '@/services/mypage/putMe'

export type MypagePersonalFormData = {
  name: string
  postalCode: string
  address: string
  tel: string
}

const MypagePersonalPage = () => {

  const { authUser, setAuthUser } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MypagePersonalFormData>()
  const [validationError, setValidationError] = useState<FormValidationError|null>(null);
  const onSubmit = async (data: MypagePersonalFormData) => {

    try {
      setValidationError(null);
      const me = await putMe(data);
      setAuthUser(me)

      toast.success('個人情報を更新しました');
    } catch (error) {
      if (error instanceof FormValidationError) {
        setValidationError(error);
        toast.error('入力内容に誤りがあります。');
      }
    }
  }

  if (authUser === null) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          個人情報（非公開）
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div className="text-red-500">
                ※商品購入時、配送先情報として氏名・郵便番号・住所は出品者に公開されます。
              </div>

              <div>
                <Label>Email</Label>
                <div className="mt-1.5 flex">
                  <div>{authUser.email}</div>
                </div>
              </div>

              <div>
                <Label>氏名</Label>
                <Input
                  {...register('name', {})}
                  className="mt-1.5"
                  defaultValue={authUser.name}
                 />

                { validationError && hasError(validationError, 'name') &&
                  getErrors(validationError, 'name').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
              </div>

              <div>
                <Label>郵便番号</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-map-signs"></i>
                  </span>
                  <Input
                    {...register('postalCode', {})}
                    className="!rounded-l-none"
                    placeholder="1234567"
                    defaultValue={authUser.postalCode}
                  />
                </div>
                { validationError && hasError(validationError, 'postal_code') &&
                  getErrors(validationError, 'postal_code').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
              </div>

              <div>
                <Label>住所</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-map-signs"></i>
                  </span>
                  <Input
                    {...register('address', {})}
                    className="!rounded-l-none"
                    defaultValue={authUser.address}
                  />
                </div>
                { validationError && hasError(validationError, 'address') &&
                  getErrors(validationError, 'address').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
              </div>

              <div>
                <Label>電話番号</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-phone-volume"></i>
                  </span>
                  <Input
                    {...register('tel', {})}
                    className="!rounded-l-none"
                    placeholder="08012345678"
                    defaultValue={authUser.tel}
                  />
                </div>
                { validationError && hasError(validationError, 'tel') &&
                  getErrors(validationError, 'tel').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
              </div>

              <div className="pt-2">
                <ButtonPrimary type="submit" className="w-full">更新する</ButtonPrimary>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default MypagePersonalPage;
