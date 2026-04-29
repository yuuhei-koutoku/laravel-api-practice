import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { Product } from '@/types/responseType'

/**
 * 商品リスト取得API
 * @returns 商品一覧
 */
const getProducts = async (): Promise<Product[]> => {
  const json = await apiFetcher(`${apiRootUrl}/products`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return json.products
}

export default getProducts
