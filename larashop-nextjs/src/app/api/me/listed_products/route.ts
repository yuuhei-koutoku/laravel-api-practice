import type { Product, ProductForMyPage } from '@/types/responseType'
const humps = require('humps');

const imageUrls = [
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const products: ProductForMyPage[] = [
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
      buyerShippingInfo: {
        id: 11,
        name: "山田 太郎",
        postalCode: "100-8111",
        address: "東京都千代田区千代田1-1",
        nickname: "たろう",
        profileImageUrl: "https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "こんにちは、山田太郎です。"
      },
      status: "listing",
      dealEvents: []
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
      buyerShippingInfo: {
        id: 12,
        name: "山田 太郎",
        postalCode: "100-8111",
        address: "東京都千代田区千代田1-1",
        nickname: "たろう",
        profileImageUrl: "https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "こんにちは、山田太郎です。"
      },
      status: "listing",
      dealEvents: []
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
      buyerShippingInfo: {
        id: 13,
        name: "山田 太郎",
        postalCode: "100-8111",
        address: "東京都千代田区千代田1-1",
        nickname: "たろう",
        profileImageUrl: "https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "こんにちは、山田太郎です。"
      },
      status: "listing",
      dealEvents: []
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
      buyerShippingInfo: {
        id: 14,
        name: "山田 太郎",
        postalCode: "100-8111",
        address: "東京都千代田区千代田1-1",
        nickname: "たろう",
        profileImageUrl: "https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "こんにちは、山田太郎です。"
      },
      status: "listing",
      dealEvents: []
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
