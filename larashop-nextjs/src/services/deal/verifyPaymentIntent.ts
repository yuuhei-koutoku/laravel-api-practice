import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { DealForMyPage } from '@/types/responseType'

export type VerifyPaymentIntentParams = {
  id: number
  paymentIntentId: string
}

/**
 * 商品支払いインテント確認API
 * @returns 取引
 */

const verifyPaymentIntent = async (verifyPaymentIntentParams: VerifyPaymentIntentParams): Promise<DealForMyPage> => {
  const { id, ...rest } = verifyPaymentIntentParams;
  return await apiFetcher(`${apiRootUrl}/products/${id}/deal/payment_intent/verify`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(rest),
  })
}

export default verifyPaymentIntent