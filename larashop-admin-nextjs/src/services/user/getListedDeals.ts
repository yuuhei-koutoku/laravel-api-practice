import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { Deal } from '@/types/responseType'

export type GetListedDealsParams = {
  id: number
}

/**
 * ユーザーの出品した取引一覧API
 * @returns 取引一覧
 */
const getListedDeals = async ({ id }: GetListedDealsParams): Promise<Deal[]> => {

  const json = await apiFetcher(`${apiRootUrl}/users/${id}/listed_deals`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return json.deals
}

export default getListedDeals
