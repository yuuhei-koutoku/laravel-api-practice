"use client"

import type { DealForMyPage, Product } from '@/types/responseType'
import Prices from "@/components/Prices";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import DealEvents from "@/components/DealEvents"
import toast from "react-hot-toast";

import getProduct from '@/services/product/getProduct'
import getDeal from '@/services/mypage/getListedProductDeal'
import cancelListingProduct from '@/services/deal/cancelListingProduct'
import reportDeliveryDeal from '@/services/deal/reportDeliveryDeal'

const ListedProduct = ( { params } : { params: { id: number }} ) => {

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

  const onSubmitListingCancel = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product === null) {
      return;
    }

    try {
      const newDeal= await cancelListingProduct({ id: product.id } );
      setDealForMyPage(newDeal);
      toast.success('出品をキャンセルしました')
    } catch (error) {
      toast.error('出品のキャンセルに失敗しました');
    }
  }

  const onSubmitReportDelivery = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product === null) {
      return;
    }

    try {
      const newDealDetail = await reportDeliveryDeal({ id: product.id });
      setDealForMyPage(newDealDetail);
      toast.success('商品の発送報告をしました。')
    } catch (error) {
      toast.error('商品の発送報告に失敗しました。');
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
              case 'listing':
                return (
                  <div>
                    <div className="mb-5">出品中です。購入申込があるまでお待ちください。</div>
                    <form onSubmit={onSubmitListingCancel}>
                      <ButtonPrimary type="submit" className="w-full">出品をキャンセルする</ButtonPrimary>
                    </form>
                  </div>
                )
              case 'purchased':
                return (
                  <div>
                    <p>購入者から決済がありました。</p>
                    <p className="text-red-500">以下の住所に商品を発送してください。</p>
                    <div className="mt-4 p-4 mb-5 font-bold bg-slate-100/80 rounded-lg">
                      〒{dealForMyPage.buyerShippingInfo.postalCode}<br />
                      {dealForMyPage.buyerShippingInfo.address}<br />
                      {dealForMyPage.buyerShippingInfo.name}
                    </div>
                    <form onSubmit={onSubmitReportDelivery}>
                      <ButtonPrimary type="submit" className="w-full">配送報告</ButtonPrimary>
                    </form>
                  </div>
                )
              case 'shipping':
                return (
                  <div>
                    <p className="text-red-500">購入者に商品発送報告をしました。購入者からの商品受取報告をお待ちください。</p>
                    <div className="mt-4 p-4 font-bold bg-slate-100/80 rounded-lg">
                      〒{dealForMyPage.buyerShippingInfo.postalCode}<br />
                      {dealForMyPage.buyerShippingInfo.address}<br />
                      {dealForMyPage.buyerShippingInfo.name}
                    </div>
                  </div>
                )
              case 'completed':
                return (
                  <div>購入者からの受取報告があり、取引完了しました。ありがとうございました。</div>
                )
              case 'canceled':
                return (
                  <div>この取引はキャンセルとなりました。</div>
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
        
        {/* SIDEBAR */}
        <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
          {renderSectionContent()}
        </div>
        
      </div>

      <div>
        <DealEvents dealForMyPage={dealForMyPage} yourActorType={"seller"} />
      </div>

    </div>
  );
};

export default ListedProduct;
