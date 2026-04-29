import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { User } from '@/types/responseType'
import humps from 'humps';

export type PutMeParams = {
  name?: string
  postalCode?: string
  address?: string
  tel?: string
  nickname?: string
  description?: string
  profileImage?: File[]
}

/**
 * ログインユーザー情報更新API
 * @returns ユーザー
 */
const getMe = async (putMeParams: PutMeParams): Promise<User> => {

  const formData = new FormData();

  Object.entries(putMeParams).forEach(([key, value]) => {
    const snakeCaseKey = humps.decamelize(key);

    if (snakeCaseKey === 'profile_image') {
      // 画像未選択の時は送信しない
      Array.from(value as File[]).forEach((file, index) => {
        formData.append(`profile_image`, file);
      });

      /*
      if (value.length) {
        console.log(value)
        formData.append(`profile_image`, value);
      }
      */
    } else {
      formData.append(snakeCaseKey, value as string);
    }
  });
  formData.append('_method', 'PUT');

  return await apiFetcher(`${apiRootUrl}/me`, {
    headers: {
      Accept: 'application/json',
    },
    method: 'POST',
    body: formData,
  })
}

export default getMe
