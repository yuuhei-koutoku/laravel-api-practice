"use client";

import React, { FC, useState } from "react";
import Logo from "@/shared/Logo/Logo";
import AvatarDropdown from "./AvatarDropdown";
import Link from "next/link";
import { useAuthContext } from '@/contexts/AuthContext'

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const { authUser, isLoaded } = useAuthContext()

  return (
    <div className="nc-MainNav2 relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 flex justify-between">

          <div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8">
            <Logo />
          </div>

          {isLoaded ? (
            authUser ? (
              <div className="flex-1 flex items-center justify-end">
                <AvatarDropdown />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-end space-x-3 sm:space-x-8">
                <Link href={"/signup"} className={`flex items-center focus:outline-none focus-visible:ring-0`}>
                  会員登録
                </Link>
                <Link href={"/login"} className={`flex items-center focus:outline-none focus-visible:ring-0`}>
                  ログイン
                </Link>
              </div>
            )
          ) : (
            <div className="flex-1 flex items-center justify-end">
              <div>...</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MainNav2;
