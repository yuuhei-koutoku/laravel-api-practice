import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { Product } from '@/types/responseType'

export type GetProductParams = {
  id: number
}

/**
 * 商品リスト取得API
 * @returns 商品一覧
 */

const getProduct = async ({ id }: GetProductParams): Promise<Product> => {
  return await apiFetcher(`${apiRootUrl}/products/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getProduct