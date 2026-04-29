import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { OperationResult } from '@/types/responseType'

export type SignupParams = {
    email: string
    password: string
}

/**
 * 会員登録API
 * @returns 実行結果
 */
const signup = async (signupParams: SignupParams): Promise<OperationResult> => {
  return await apiFetcher(`${apiRootUrl}/auth/signup`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(signupParams),
  })
}

export default signup
