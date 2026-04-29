import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { User } from '@/types/responseType'

export type GetUserParams = {
  id: number
}

/**
 * ユーザー取得API
 * @returns ユーザー
 */

const getUser = async ({ id }: GetUserParams): Promise<User> => {
  return await apiFetcher(`${apiRootUrl}/users/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getUser