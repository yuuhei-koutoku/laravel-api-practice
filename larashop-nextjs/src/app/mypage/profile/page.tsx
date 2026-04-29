"use client"

import Label from "@/components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import FormValidationError  from "@/types/FormValidationError";
import { hasError, getErrors } from "@/types/FormValidationError";
import AvatarDefaultSrc from "@/images/avatar-default.png";
import Textarea from "@/shared/Textarea/Textarea";
import Image from "next/image";
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { useAuthContext } from '@/contexts/AuthContext'

import putMe from '@/services/mypage/putMe'

export type MypageProfileFormData = {
  nickname: string
  description: string
  profile_image: File[]
}

const MypageProfilePage = () => {

  const { authUser, setAuthUser } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MypageProfileFormData>()
  const [validationError, setValidationError] = useState<FormValidationError|null>(null);
  const onSubmit = async (data: MypageProfileFormData) => {

    try {
      setValidationError(null);
      const me = await putMe(data);
      setAuthUser(me)

      toast.success('プロフィール情報を更新しました');
    } catch (error) {
      if (error instanceof FormValidationError) {
        setValidationError(error);
        toast.error(error.message);
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
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          プロフィール（公開）
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">

              <div className="relative rounded-full overflow-hidden flex">
                <Image
                  src={authUser?.profileImageUrl ?? AvatarDefaultSrc}
                  alt="avatar"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">画像の変更</span>
                </div>
                <input
                  {...register('profile_image')}
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>ニックネーム</Label>
                <Input
                  {...register('nickname', {})}
                  className="mt-1.5"
                  defaultValue={authUser.nickname}
                />
                { validationError && hasError(validationError, 'nickname') &&
                  getErrors(validationError, 'nickname').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
              </div>

              <div>
                <Label>紹介文</Label>
                <Textarea
                  {...register('description', {})}
                  className="mt-1.5"
                  defaultValue={authUser.description}
                />
                { validationError && hasError(validationError, 'description') &&
                  getErrors(validationError, 'description').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
              </div>

              <div>
                { validationError && hasError(validationError, 'profile_image') &&
                  getErrors(validationError, 'profile_image').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
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

export default MypageProfilePage;
