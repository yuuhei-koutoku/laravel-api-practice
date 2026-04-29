"use client";

import React, { FormEvent, useEffect, useState } from "react";
import type { Product } from '@/types/responseType'
import getProduct from '@/services/product/getProduct'
import createPaymentIntent from '@/services/deal/createPaymentIntent'
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "@/components/BagIcon";
import Image from "next/image";
//import CreditCard from "@/app/CreditCard";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import isEmptyOrNull from "@/utils/isEmptyOrNull";
import toast from "react-hot-toast";

import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/app/CheckoutForm";

import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/contexts/AuthContext";
import { useRequireLogin } from "@/hooks/useRequireLogin"

export type PurchaseProductFormData = {
}

let stripePromise: Promise<any> | null;
if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
} else {
  stripePromise = null;
}

const ProductDetailPurchase = ( { params } : { params: { id: number }} ) => {

  const router = useRouter()
  const { authUser } = useAuthContext()
  const isAuthed = useRequireLogin()
  const [product, setProduct] = useState<Product | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  const canPurchase = authUser && (
      !isEmptyOrNull(authUser.postalCode) && 
      !isEmptyOrNull(authUser.address) && 
      !isEmptyOrNull(authUser.name)
  );

  useEffect(() => {
    getProduct(params).then((product) => {
      setProduct(product);
    })

    // 支払いインテントの作成
    const fetchPaymentIntent = async () => {
      try {
        const paymentIntent = await createPaymentIntent(params);
        setClientSecret(paymentIntent.clientSecret);
      } catch (error) {

        if (error instanceof Error) {
          toast.error(error.message ?? '商品の購入に失敗しました。');
        } else {
          toast.error('商品の購入に失敗しました。');
        }

      }
    };
    fetchPaymentIntent();

  }, []);

  if (!authUser || !isAuthed) {
    return <div></div>
  }

  const onSubmitTestmode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product === null || clientSecret === "") {
      return;
    }

    const redirectPath = `/products/${product.id}/purchase_confirm?payment_intent=${clientSecret}&payment_intent_client_secret=${clientSecret}`;
    location.href = redirectPath;
  }

  const address = () => {

    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl">
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">お届け先情報</h3>
          <Link href="/mypage/personal">
            <ButtonSecondary
               sizeClass="py-2.5 px-4 sm:px-6"
               fontSize="text-sm font-medium"
            >変更する
            </ButtonSecondary>
          </Link>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 block">
          <div>郵便番号: {authUser.postalCode}</div>
          <div>住所: {authUser.address}</div>
          <div>氏名: {authUser.name}</div>
          {!canPurchase && (
            <div className="text-red-500 font-bold">
              購入するためには、郵便番号・住所・氏名のうち未入力のものを入力してください。
            </div>
          )}
        </div>
      </div>
    )
  }

  const paymentMethod = () => {
    if (stripePromise === null) {
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="p-6 flex flex-col sm:flex-row items-start">
            <h3 className="text-lg font-semibold">決済情報</h3>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 block">
            .envでNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEYが設定されていないため、決済機能はテストモードになります。
          </div>
          <form onSubmit={onSubmitTestmode}>
            {!canPurchase && (
              <div className="m-2 text-red-500 font-bold">
                購入するためには、郵便番号・住所・氏名のうち未入力のものを入力してください。
              </div>
            )}
            {clientSecret !== "" && (
              <ButtonPrimary
                className="w-full"
                type="submit"
              >
                <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                <span className="ml-3">購入する</span>
              </ButtonPrimary>
            )}
          </form>
        </div>
      )
    }

    const appearance: Appearance = {
      theme: 'stripe',
    }
    const options: StripeElementsOptions = {
      clientSecret,
      appearance,
    }

    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <h3 className="text-lg font-semibold">決済情報</h3>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 block">
          {clientSecret && product && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm product={product} />
          </Elements>
          )}
        </div>
      </div>
    )
  }


  const productInfo = (product: Product) => {
    return (
      <div className="listingSectionSidebar__wrap lg:shadow-lg">
        <div className="space-y-7 lg:space-y-8">
          <div className="hidden sm:flex flex-col space-y-4 ">
            <div className="space-y-2.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{product.name}</span>
                <span>¥{product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>配送料・手数料</span>
                <span>¥0</span>
              </div>
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700"></div>
            <div className="flex justify-between font-semibold">
              <span>合計</span>
              <span>¥{product.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderSectionContent = (product: Product) => {

    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            <div className="flex justify-between text-slate-600 dark:text-slate-300 m-5">
              <span>{product.name}</span>
              <span>¥{product.price.toLocaleString()}</span>
            </div>
          </h2>

          <div className="mb-3 space-y-3 sm:space-y-5">
            {address()}
            {productInfo(product)}
            {paymentMethod()}

          </div>

        </div>


      </div>
    );
  }; 

  if (product === null) {
      return <div></div>
  }

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-14 sm:mt-20">

        <div className="max-w-2xl">
          <h2 className="text-3xl xl:text-4xl font-semibold">購入確認画面</h2>
        </div>

        <div className="mt-10 space-y-10 sm:space-y-12">

          <div className="lg:flex">
            <div className="w-full lg:w-[45%] ">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-16 relative">
                  <Image
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    src={product.imageUrl}
                    className="w-full rounded-2xl object-cover"
                    alt="product detail 1"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[55%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              {renderSectionContent(product)}
            </div>

          </div>

        </div>

      </div>
    </div>

  );
};

export default ProductDetailPurchase;