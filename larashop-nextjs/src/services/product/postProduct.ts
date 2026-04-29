import { apiFetcher, apiRootUrl } from '@/utils/apiFetcher'
import { Product } from '@/types/responseType'
import humps from 'humps';

export type PostProductParams = {
  name: string
  description: string
  price: number
  images: File[]
}

/**
 * 商品出品API
 * @returns 商品
 */

const postProduct = async (postProductParams: PostProductParams): Promise<Product> => {

  const formData = new FormData();

  Object.entries(postProductParams).forEach(([key, value]) => {
    const snakeCaseKey = humps.decamelize(key);

    if (snakeCaseKey === 'images') {
      Array.from(value as File[]).forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    } else {
      formData.append(snakeCaseKey, value as string);
    }
  });

  return await apiFetcher(`${apiRootUrl}/products`, {
    headers: {
      Accept: 'application/json',
    },
    method: 'POST',
    body: formData,
  })
}

export default postProduct