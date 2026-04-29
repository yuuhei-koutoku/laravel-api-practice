"use client";

import React, { useEffect, useState } from "react";
import ProductCardMyPage from "@/components/ProductCardMyPage";

import type { ProductForMyPage } from '@/types/responseType'
import getListedProducts from '@/services/mypage/getListedProducts'

const ListedProducts = () => {

  const [products, setProducts] = useState<ProductForMyPage[]>([]);

  useEffect(() => {
    getListedProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div className="space-y-10 sm:space-y-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          出品した商品
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {products.map((product, key) => {
          const href = "/mypage/listed_products/" + product.id
          return (
            <ProductCardMyPage key={key} product={product} href={href} />
          )
        })}
      </div>
      
    </div>
  );
};

export default ListedProducts;
