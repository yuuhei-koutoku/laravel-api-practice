"use client" 

import Label from "@/components/Label/Label";
import React, { FC, ChangeEvent, useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form'
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation'
import { useRequireLogin } from "@/hooks/useRequireLogin"
import FormValidationError  from "@/types/FormValidationError";
import { hasError, getErrors } from "@/types/FormValidationError";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import postProduct from '@/services/product/postProduct'
import isEmptyOrNull from "@/utils/isEmptyOrNull";
import toast from "react-hot-toast";


export type PostProductFormData = {
  name: string
  description: string
  price: number
  images: File[]
}

const Listing = () => {

  const isLoaded = useRequireLogin()

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
      setValue('images', Array.from(files))
    }
  };

  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<PostProductFormData>()
  const [validationError, setValidationError] = useState<FormValidationError|null>(null);

  const { authUser } = useAuthContext()
  const canList = authUser && !isEmptyOrNull(authUser.nickname);

  const onSubmit = async (data: PostProductFormData) => {

    try {
      setValidationError(null);
      const product = await postProduct(data);

      toast.success('商品を出品しました。')
      const redirectPath = `/products/${product.id}`
      location.href = redirectPath;

    } catch (error: unknown) {
      if (error instanceof FormValidationError) {
        setValidationError(error);
      } else if (error instanceof Error) {
        toast.error(error.message ?? '商品の出品に失敗しました。');
      } else {
        toast.error('商品の出品に失敗しました。');
      }
    }
  }

  if (!isLoaded) {
    return <div className="nc-AccountCommonLayout container"></div>
  }

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        <div className="max-w-2xl">
          <h2 className="text-3xl xl:text-4xl font-semibold">出品</h2>
        </div>

        <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>
          
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-grow pt-10 md:pl-16 max-w-3xl space-y-6">

            <div>
              <Label>商品画像</Label>
              <div className="mt-1.5">

                <div>
                  <ButtonSecondary type="button" onClick={handleImageButtonClick}>
                    画像を選択する
                  </ButtonSecondary>

                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-3">
                    {selectedImages.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Thumbnail ${index}`}
                        className="object-cover w-full h-full"
                      />
                    ))}
                  </div>

                  { validationError && hasError(validationError, 'images') &&
                    getErrors(validationError, 'images').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }

                </div>

              </div>
            </div>

            <div>
              <Label>商品名</Label>
              <Input
                {...register('name', {})} 
                className="mt-1.5"
                defaultValue=""
              />
              { validationError && hasError(validationError, 'name') &&
                getErrors(validationError, 'name').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
            </div>

            <div>
              <Label>金額</Label>
              <Input
                {...register('price', {})} 
                className="mt-1.5"
                defaultValue=""
              />
              <p className="mt-1.5 text-red-500">※送料は出品者負担となりますので、金額には送料を含めてください。</p>
              { validationError && hasError(validationError, 'price') &&
                getErrors(validationError, 'price').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
            </div>

            <div>
              <Label>商品紹介文</Label>
              <Textarea
                {...register('description', {})} 
                className="mt-1.5"
                defaultValue=""
              />
              { validationError && hasError(validationError, 'description') &&
                getErrors(validationError, 'description').map((detail: string) => <p className="mt-1.5 text-red-500">{detail}</p>) }
            </div>

            <div className="pt-2">
              {!canList && (
                <div className="text-red-500 font-bold">
                  出品するためには、ニックネームを登録してください
                </div>
              )}
              <ButtonPrimary type="submit" className="w-full">出品する</ButtonPrimary>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Listing;
