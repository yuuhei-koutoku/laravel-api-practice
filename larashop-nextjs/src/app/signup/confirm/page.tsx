"use client" 

import React from "react";
import { useSignupContext } from "@/contexts/SignupContext";

const PageSignUpConfirm = () => {

  const { email } = useSignupContext()

  return (
      <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            新規会員登録
          </h2>
          <div className="max-w-md mx-auto space-y-6 ">
            <p>{email}に会員登録用のメールを送信しました。</p>
            <p>メール内のリンクをクリックして会員登録完了させてください。</p>
          </div>
        </div>
      </div>
  );
};

export default PageSignUpConfirm;
