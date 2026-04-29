import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { AccessToken } from '@/types/responseType'

export type SigninParams = {
    email: string
    password: string
}

/**
 * ログインAPI
 * @returns 実行結果
 */
const signin = async (signinParams: SigninParams): Promise<AccessToken> => {
  return await apiFetcher(`${apiRootUrl}/auth/signin`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(signinParams),
  })
}

export default signin