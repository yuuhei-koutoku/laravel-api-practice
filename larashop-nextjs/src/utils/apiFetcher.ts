import humps from 'humps';
import FormValidationError from '@/types/FormValidationError';
import UnauthorizedError from '@/types/UnauthorizedError';
import getCsrfToken from './getCsrfToken';
import getCookieValue from './getCookieValue';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/types/localStorageKeys';

export const apiRootUrl = process.env.NEXT_PUBLIC_API_BASE_PATH || 'http://localhost:3000'

export const apiFetcher = async (
    resource: RequestInfo,
    init: RequestInit,
    isRetry = false,
  ): Promise<any> => {

    // HTTPヘッダーにCSRFトークンとBearerトークンを設定
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) ?? ''
    init.credentials = 'include'
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
      "X-XSRF-TOKEN": getCookieValue('XSRF-TOKEN') ?? '',
    }

    // リクエストのデータがある場合、それをスネークケースに変換
    if (init?.body && typeof init.body === 'string') {
      init.body = JSON.stringify(humps.decamelizeKeys(JSON.parse(init.body)));
    }

    // APIコール
    const res = await fetch(resource, init)

    if (!res.ok) {
      await errorHandler(res, resource, init, isRetry)
    }

    // レスポンスをキャメルケースに変換
    const jsonData = await res.json();
    return humps.camelizeKeys(jsonData);
  }

const errorHandler = async (
  res: Response,
  resource: RequestInfo,
  init: RequestInit,
  isRetry = false,
): Promise<any> => {

    // 419エラーの場合、CSRFトークンを再取得してリトライ
  if (res.status === 419 && !isRetry) {
    await getCsrfToken()
    return await apiFetcher(resource, init, isRetry = true)
  }

  if (res.status === 401) {
    throw new UnauthorizedError('再度ログインしてください')
  }

  if (res.status === 422) {
    const resJson = await res.json()
    throw new FormValidationError(resJson.message ?? 'フォームの入力内容に誤りがあります', resJson.errors ?? [])
  }

  const error = await res.json()
  const errorMessage = error?.message ?? 'エラーが発生しました'
  throw new Error(errorMessage);
}