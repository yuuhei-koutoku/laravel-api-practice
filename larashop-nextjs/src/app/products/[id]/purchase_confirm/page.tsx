"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import confirmPayment, { VerifyPaymentIntentParams } from '@/services/deal/verifyPaymentIntent'
import { useAuthContext } from '@/contexts/AuthContext'
import toast from "react-hot-toast";

const ProductDetailPurchaseConfirm = ( { params } : { params: { id: number }} ) => {
  const router = useRouter()
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');
  const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
  if (params.id === null || paymentIntent === null || paymentIntentClientSecret === null ) {
    throw new Error('Required URL parameter is missing.');
  }
  const formData: VerifyPaymentIntentParams = {
    id: params.id,
    paymentIntentId: paymentIntent,
  }

  useEffect(() => {
    const confirmPaymentInternal = async () => {
      try {
        const DealForMyPage = await confirmPayment(formData)

        const redirectPath = `/mypage/purchased_products/${params.id}`;
        router.push(redirectPath);
        toast.success('商品の購入が完了しました！');
      } catch (error) {
        setIsFailed(true)
      }
    }
    confirmPaymentInternal()
  }, []);

  if (!isFailed) {
    return (
      <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
        <div className="container mt-16 mb-16 text-center">
          <div>決済処理中...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container font-bold mt-16 mb-16 text-center text-red-500">
        <div>決済処理に失敗しました。お問い合わせください。</div>
      </div>
    </div>
  );
};

export default ProductDetailPurchaseConfirm;