import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { UserPagination } from '@/types/responseType'

export type GetUsersParams = {
  limit?: number
  page?: number
  keyword?: string|null
}

/**
 * ユーザー一覧取得API
 * @returns ユーザー一覧
 */
const getUsersPagination = async (params: GetUsersParams = {}): Promise<UserPagination> => {

  // パラメータのフィルタリング
  const filteredParams: Record<string, string> = {};
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      filteredParams[key] = String(params[key]);
    }
  });

  const queryParams = new URLSearchParams(filteredParams).toString();

  const json = await apiFetcher(`${apiRootUrl}/users?${queryParams}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return json
}

export default getUsersPagination
