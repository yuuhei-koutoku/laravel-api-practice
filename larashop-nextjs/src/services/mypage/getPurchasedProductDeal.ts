import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { DealForMyPage } from '@/types/responseType'

export type GetPurchasedProductDealParams = {
  id: number
}

/**
 * 出品商品の取引詳細情報取得API
 * @returns 取引
 */
const getListedProductDeal = async ({ id }: GetPurchasedProductDealParams): Promise<DealForMyPage> => {
  return await apiFetcher(`${apiRootUrl}/me/purchased_products/${id}/deal`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getListedProductDeal
