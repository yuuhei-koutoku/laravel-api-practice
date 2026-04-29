import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { DealForMyPage } from '@/types/responseType'

export type CancelListingProductParams = {
  id: number
}

/**
 * 商品出品キャンセルAPIAPI
 * @returns 商品
 */
const cancelListingProduct = async (cancelListingProductParams: CancelListingProductParams): Promise<DealForMyPage> => {
  const id = cancelListingProductParams.id
  return await apiFetcher(`${apiRootUrl}/products/${id}/deal/cancel`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export default cancelListingProduct