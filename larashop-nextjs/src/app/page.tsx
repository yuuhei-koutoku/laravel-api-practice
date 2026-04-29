"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

import type { Product } from '@/types/responseType'
import getProducts from '@/services/product/getProducts'

const Home = ({}) => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              商品一覧
            </h2>
          </div>

          <main>
            {/* TABS FILTER */}

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
            
          </main>
        </div>

      </div>
    </div>
  );
};

export default Home;
