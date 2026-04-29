import React, { useEffect, useState } from "react";
import type { Product } from '@/types/responseType'
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import BagIcon from "@/components/BagIcon";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

type CheckoutFormProps = {
  product: Product
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/products/${product.id}/purchase_confirm`
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? 'An unexpected error occurred.');
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <ButtonPrimary
        className="w-full mt-5"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ?
            <div className="spinner" id="spinner"></div> :
            <>
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span>購入する</span>
            </>
          }
        </span>
      </ButtonPrimary>
    </form>
  );
}
