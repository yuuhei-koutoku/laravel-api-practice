import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { Deal } from '@/types/responseType'

export type GetPurchasedDealsParams = {
  id: number
}

/**
 * ユーザーの購入した取引一覧API
 * @returns 取引一覧
 */
const getPurchasedDeals = async ({ id }: GetPurchasedDealsParams): Promise<Deal[]> => {

  const json = await apiFetcher(`${apiRootUrl}/users/${id}/purchased_deals`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return json.deals
}

export default getPurchasedDeals
