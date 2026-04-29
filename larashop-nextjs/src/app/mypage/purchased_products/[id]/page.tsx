"use client"

import type { DealForMyPage, Product } from '@/types/responseType'
import Prices from "@/components/Prices";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import DealEvents from "@/components/DealEvents"
import toast from "react-hot-toast";

import getProduct from '@/services/product/getProduct'
import getDeal from '@/services/mypage/getPurchasedProductDeal'
import reportReceiptDeal from '@/services/deal/reportReceiptDeal'

const PurchasedProduct = ( { params } : { params: { id: number }} ) => {

  const [product, setProduct] = useState<Product | null>(null);
  const [dealForMyPage, setDealForMyPage] = useState<DealForMyPage | null>(null);


  useEffect(() => {
    getProduct(params).then((product) => {
      setProduct(product);
    });
    getDeal(params).then((deal) => {
      setDealForMyPage(deal);
    });
  }, []);

  const onSubmitReportReceipt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product === null) {
      return;
    }

    try {
      const newDeal = await reportReceiptDeal({ id: product.id });
      setDealForMyPage(newDeal);
      toast.success('商品の受取報告をしました。')
    } catch (error) {
      toast.error('商品の受取報告に失敗しました。');
    }
  }

  if (product === null || dealForMyPage === null) {
    return (
      <div>loading...</div>
    )
  }

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {product.name}
          </h2>

          <div className="flex justify-between mt-5 space-x-4 sm:space-x-5">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={product.price}
            />

          </div>
        </div>

        {
        (() => {
            switch (dealForMyPage.status) {
              case 'purchased':
                return (
                  <div>決済完了しました。出品者が配送準備中です。</div>
                )
              case 'shipping':
                return (
                  <div>
                    <div className="mb-5">出品者が配送を行いました。商品が届いたら受取報告をしてください。</div>
                    <form onSubmit={onSubmitReportReceipt}>
                      <div className="block pt-2">
                        <ButtonPrimary type="submit" className="w-full">受取報告</ButtonPrimary>
                      </div>
                    </form>
                  </div>
                )
              case 'completed':
                return (
                  <div>取引完了しました。ありがとうございました。</div>
                )
              case 'canceled':
                return (
                  <div>この取引はキャンセルとなりました。</div>
                )
              default:
                return (
                  <div></div>
                )
            }
          })()
        }

      </div>
    );
  }; 

  return (
    <div className="space-y-10 sm:space-y-12">

      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[55%] ">
          {/* HEADING */}
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
        
        <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
          {renderSectionContent()}
        </div>
        
      </div>

      <div>
        <DealEvents dealForMyPage={dealForMyPage} yourActorType={"buyer"} />
      </div>

    </div>
  );
};

export default PurchasedProduct;