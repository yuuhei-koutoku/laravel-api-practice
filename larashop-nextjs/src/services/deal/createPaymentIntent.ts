import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { PaymentIntent } from '@/types/responseType'

export type CreatePaymentIntentParams = {
  id: number
}

/**
 * 商品支払いインテント作成API
 * @returns 支払いインテント
 */
const createPaymentIntent = async (issueProductClientSecretParams: CreatePaymentIntentParams): Promise<PaymentIntent> => {
  const id = issueProductClientSecretParams.id
  return await apiFetcher(`${apiRootUrl}/products/${id}/deal/payment_intent`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export default createPaymentIntent