import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { ProductForMyPage } from '@/types/responseType'

/**
 * 出品商品リスト取得API
 * @returns 商品一覧
 */
const getListedProducts = async (): Promise<ProductForMyPage[]> => {
  const json = await apiFetcher(`${apiRootUrl}/me/listed_products`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return json.products
}

export default getListedProducts
