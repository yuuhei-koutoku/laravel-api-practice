import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { AccessToken } from '@/types/responseType'

export type SignupVerifyParams = {
  id: number
  expires: number
  signature: string
}

/**
 * 会員登録完了API
 * @returns 実行結果
 */
const signupVerify = async (signupVerifyParams: SignupVerifyParams): Promise<AccessToken> => {
  return await apiFetcher(`${apiRootUrl}/auth/signup/verify`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(signupVerifyParams),
  })
}

export default signupVerify
