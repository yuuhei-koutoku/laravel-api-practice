"use client";

import React, { FC, useState } from "react";
import { parse } from 'url';
import Prices from "./Prices";
import ProductCardSoldOut from "./ProductCardSoldOut";
import { Product } from '@/types/responseType'
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";

export interface ProductCardProps {
  className?: string;
  product: Product;
  href?: string,
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  product,
  href = null
}) => {

  const {
    id,
    name,
    price,
    description,
    imageUrl,
  } = product;

  const linkHref = (href !== null) ? href : `/products/${id}`;
  const urlObject = parse(linkHref, true);

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          {
            (product.deal.isPurchasable) ?
                <Link href={urlObject} as={urlObject} passHref>
                  <NcImage
                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                    src={imageUrl}
                    className="object-cover w-full h-full drop-shadow-xl"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    alt="product"
                  />
                </Link>
              :
                <>
                  <NcImage
                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 opacity-50"
                    src={imageUrl}
                    className="object-cover w-full h-full drop-shadow-xl"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    alt="product"
                  />
                  <ProductCardSoldOut />
                </>
          }
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {name}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {description}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={price} />
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductCard;
