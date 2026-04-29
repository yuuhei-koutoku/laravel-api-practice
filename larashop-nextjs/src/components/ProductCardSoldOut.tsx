import {
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import React, { FC } from "react";

interface Props {
  className?: string;
}

const ProductCardSoldOut: FC<Props> = ({
  className = "absolute top-3 left-3 px-4 py-2.5 text-white bg-red-500",
}) => {

  const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
  return (
    <div className={CLASSES}>
      <NoSymbolIcon className="w-3.5 h-3.5" />
      <span className="ml-1 leading-none">売切</span>
    </div>
  )
};

export default ProductCardSoldOut;
