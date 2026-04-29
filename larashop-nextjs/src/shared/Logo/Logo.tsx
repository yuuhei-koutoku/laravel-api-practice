import React from "react";
import logoImg from "@/images/logo.svg";
import logoLightImg from "@/images/logo-light.svg";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
}

const Logo: React.FC<LogoProps> = ({ }) => {
  return (
    <Link
      href="/"
      className={`text-4xl font-bold text-center inline-block text-rose-500`}
    >
      <h1>Larashop</h1>
    </Link>
  );
};

export default Logo;
