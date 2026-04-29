import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { DealPagination } from '@/types/responseType'

export type GetDealsParams = {
  limit?: number
  page?: number
  keyword?: string|null
  status?: string|null
  minPrice?: number|null
  maxPrice?: number|null
}

/**
 * 取引一覧取得API
 * @returns 取引一覧
 */
const getDeals = async (params: GetDealsParams = {}): Promise<DealPagination> => {

  // パラメータのフィルタリング
  const filteredParams: Record<string, string> = {};
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      filteredParams[key] = String(params[key]);
    }
  });

  const queryParams = new URLSearchParams(filteredParams).toString();

  const json = await apiFetcher(`${apiRootUrl}/deals?${queryParams}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return json
}

export default getDeals
