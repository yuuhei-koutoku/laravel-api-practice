import type { Product } from '@/types/responseType'
const humps = require('humps');

const imageUrls = [
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const products: Product[] = [
  {
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
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    description: "Good Nike Air Max",
    imageUrl: imageUrls[0],
    imageUrls: imageUrls,
    price: 10000,
    deal: {
      id: 2,
      isPurchasable: false,
      sellerInfo: {
        id: 2,
        nickname: "John Doe",
        profileImageUrl: imageUrls[0],
        description: "Hi, I'm John Doe",
      },
    }
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    description: "Good Nike Air Max",
    imageUrl: imageUrls[0],
    imageUrls: imageUrls,
    price: 10000,
    deal: {
      id: 3,
      isPurchasable: false,
      sellerInfo: {
        id: 3,
        nickname: "John Doe",
        profileImageUrl: imageUrls[0],
        description: "Hi, I'm John Doe",
      },
    }
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    description: "Good Nike Air Max",
    imageUrl: imageUrls[0],
    imageUrls: imageUrls,
    price: 10000,
    deal: {
      id: 4,
      isPurchasable: true,
      sellerInfo: {
        id: 4,
        nickname: "John Doe",
        profileImageUrl: imageUrls[0],
        description: "Hi, I'm John Doe",
      },
    }
  }
];
const snakeCaseResponseJson = humps.decamelizeKeys(products);
  
export async function GET(request: Request) {
  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}
