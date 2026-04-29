import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { DealForMyPage } from '@/types/responseType'

export type ReportDeliveryDealParams = {
  id: number
}

/**
 * 配送報告API
 * @returns 商品
 */
const reportDeliveryDeal = async (reportDeliveryDealParams: ReportDeliveryDealParams): Promise<DealForMyPage> => {
  const id = reportDeliveryDealParams.id
  return await apiFetcher(`${apiRootUrl}/products/${id}/deal/report_delivery`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export default reportDeliveryDeal