"use client";

import type { Product } from '@/types/responseType'
import getProduct from '@/services/product/getProduct'

import React, { useEffect, useState } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import BagIcon from "@/components/BagIcon";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from '@/contexts/AuthContext'

import { Route } from "next";

const ProductDetail = ( { params } : { params: { id: number }} ) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");
  
  const { authUser, isLoaded: isAuthLoaded } = useAuthContext()

  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    getProduct(params).then((product) => {
      if (!product.deal.isPurchasable) {
        router.push('/')
      }
      setProduct(product);
    });
  }, []);

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };
  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  if (product === null || !isAuthLoaded) {
    return (
      <div></div>
    )
  }

  const renderSectionSidebar = () => {
    const id = product.id
    return (
      <div className="listingSectionSidebar__wrap lg:shadow-lg">
        <div className="space-y-7 lg:space-y-8">
          {/* PRICE */}
          <div className="">
            {/* ---------- 1 HEADING ----------  */}
            <div className="flex items-center justify-between space-x-5">
              <div className="flex text-2xl font-semibold">
                ¥{product.price.toLocaleString()}
              </div>
            </div>
            
          </div>
          {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
          <div>
              {
                !authUser
                  ?  <Link href={`/login`}>
                      <ButtonPrimary
                        className="flex-1 flex-shrink-0 w-full"
                      >
                        <span className="ml-3">ログインして商品購入へ</span>
                      </ButtonPrimary>
                    </Link>
                  : product.deal.sellerInfo.id === authUser.id
                    ? <Link href={`/mypage/listed_products/${id}`} as={`/mypage/listed_products/${id}`} passHref>
                        <ButtonPrimary
                          className="flex-1 flex-shrink-0 w-full"
                        >
                          <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                          <span className="ml-3">自身で出品した商品です</span>
                          </ButtonPrimary>
                      </Link>
                    : <Link href={`/products/${id}/purchase`} as={`/products/${id}/purchase`} passHref>
                        <ButtonPrimary
                          className="flex-1 flex-shrink-0 w-full"
                        >
                          <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                          <span className="ml-3">購入画面へ</span>
                          </ButtonPrimary>
                      </Link>
              }
          </div>

          {/* SUM */}
          <div className="hidden sm:flex flex-col space-y-4 ">
            <div className="space-y-2.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="flex">
                  <span>{product.name}</span>
                </span>

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
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !border-b-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {product.name}
          </h2>
        </div>
        {/*  */}
        <div className="block lg:hidden">{renderSectionSidebar()}</div>

        {/*  */}
        <div className="w-full rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between w-full px-4 py-2 font-bold text-left bg-slate-100/80 dark:bg-slate-800 rounded-lg">
            商品説明
          </div>
          <div className="p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6">
            {product.description}
          </div>
        </div>

        <div className="w-full rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between w-full px-4 py-2 font-bold text-left bg-slate-100/80 dark:bg-slate-800 rounded-lg">
            出品者情報
          </div>
          <div className="p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6 flex flex-row space-x-4">
            <Avatar sizeClass="w-24 h-24" imgUrl={product.deal.sellerInfo.profileImageUrl ?? undefined} />
            <div>
              <div className="font-bold">{product.deal.sellerInfo.nickname}</div>
              <div>{product.deal.sellerInfo.description}</div>
            </div>
          </div>
          
        </div>
      </div>
    );
  };

  return (
    <div className={`ListingDetailPage nc-ProductDetailPage2`}>
      <>
        <header className="container mt-8 sm:mt-10">
          <div className="relative ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">

              {product.imageUrls[0] && (
                <div
                  className="md:h-full aspect-w-16 aspect-h-16 col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                >
                  <NcImage
                    alt="firt"
                    containerClassName="aspect-w-3 aspect-h-4 relative md:aspect-none md:absolute md:inset-0"
                    className="object-cover rounded-md sm:rounded-xl"
                    src={product.imageUrls[0]}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity rounded-md sm:rounded-xl"></div>
                </div>
              )}

              {product.imageUrls[1] && (
                <div
                  className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden z-0 cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                >
                  <NcImage
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    containerClassName="absolute inset-0"
                    className="object-cover w-full h-full rounded-md sm:rounded-xl"
                    src={product.imageUrls[1]}
                  />
                  <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity"></div>
                </div>
              )}

              {product.imageUrls[2] && (
                <div
                  className={`relative rounded-md sm:rounded-xl overflow-hidden z-0`}
                >
                  <NcImage
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={product.imageUrls[2]}
                  />
                  <div
                    className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                    onClick={handleOpenModalImageGallery}
                  />
                </div>
              )}

              {product.imageUrls[3] && (
                <div
                  className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 block`}
                >
                  <NcImage
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={product.imageUrls[3]}
                  />
                  <div
                    className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                    onClick={handleOpenModalImageGallery}
                  />
                </div>
              )}

            </div>
            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                全ての画像を表示
              </span>
            </div>
          </div>
        </header>
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-9 mb-9 sm:mt-11 flex ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pr-14 lg:space-y-14">
          {renderSection1()}
        </div>

        {/* SIDEBAR */}
        <div className="flex-grow">
          <div className="hidden lg:block sticky top-28">
            {renderSectionSidebar()}
          </div>
        </div>
      </main>


      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={product.imageUrls.map((item, index) => {
          return {
            id: index,
            url: item,
          };
        })}
      />
    </div>
  );
};

export default ProductDetail;
