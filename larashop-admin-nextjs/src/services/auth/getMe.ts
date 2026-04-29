import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { User } from '@/types/responseType'

/**
 * ログインユーザー情報取得API
 * @returns ユーザー
 */
const getMe = async (): Promise<User> => {
  return await apiFetcher(`${apiRootUrl}/auth/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getMe
