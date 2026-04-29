"use client";

import React, { useEffect, useState } from "react";
import ProductCardMyPage from "@/components/ProductCardMyPage";

import type { ProductForMyPage } from '@/types/responseType'
import getPurchasedProducts from '@/services/mypage/getPurchasedProducts'

const MypagePurchase = () => {

  const [products, setProducts] = useState<ProductForMyPage[]>([]);

  useEffect(() => {
    getPurchasedProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            購入した商品
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {products.map((product, key) => {
            const href = "/mypage/purchased_products/" + product.id
            return (
              <ProductCardMyPage key={key} product={product} href={href} />
            )
          })}
        </div>
        
      </div>
    );

};

export default MypagePurchase;
