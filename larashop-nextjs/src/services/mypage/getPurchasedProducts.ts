import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { ProductForMyPage } from '@/types/responseType'

/**
 * 購入商品リスト取得API
 * @returns 商品一覧
 */
const getPurchasedProducts = async (): Promise<ProductForMyPage[]> => {
  const json = await apiFetcher(`${apiRootUrl}/me/purchased_products`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return json.products
}

export default getPurchasedProducts