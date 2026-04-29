import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { DealForMyPage } from '@/types/responseType'

export type ReportReceiptDealParams = {
  id: number
}

/**
 * 受取報告API
 * @returns 商品
 */
const reportReceiptDeal = async (reportReceiptDealParams: ReportReceiptDealParams): Promise<DealForMyPage> => {
  const id = reportReceiptDealParams.id
  return await apiFetcher(`${apiRootUrl}/products/${id}/deal/report_receipt`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export default reportReceiptDeal