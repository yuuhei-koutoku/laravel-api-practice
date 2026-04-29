import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { OperationResult } from '@/types/responseType'

/**
 * ログアウトAPI
 * @returns 実行結果
 */
const signup = async (): Promise<OperationResult> => {
  return await apiFetcher(`${apiRootUrl}/auth/signout`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export default signup
