import type { Product } from '@/types/responseType'
const humps = require('humps');

const imageUrls = [
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
  
export async function GET(request: Request, { params }: { params: { id: number } }) {

  const { id } = params

  const product: Product = {
    id: 1,
    name: "Nike Air Max 270",
    description: "Good Nike Air Max",
    imageUrl: imageUrls[0],
    imageUrls: imageUrls,
    price: 10000,
    deal: {
      id: 1,
      isPurchasable: true,
      sellerInfo: {
        id: 1,
        nickname: "John Doe",
        profileImageUrl: imageUrls[0],
        description: "Hi, I'm John Doe",
      },
    }
  }
  const snakeCaseResponseJson = humps.decamelizeKeys(product);

  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}
