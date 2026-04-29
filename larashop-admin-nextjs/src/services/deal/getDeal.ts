import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { DealDetail } from '@/types/responseType'

export type GetDealParams = {
  id: number
}

/**
 * 取引取得API
 * @returns 取引
 */

const getDeal = async ({ id }: GetDealParams): Promise<DealDetail> => {
  return await apiFetcher(`${apiRootUrl}/deals/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getDeal