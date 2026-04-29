import type { DealForMyPage, DealStatus } from '@/types/responseType'
const humps = require('humps');

const imageUrls = [
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const dealStatuses: DealStatus[] = ['listing', 'purchased', 'shipping', 'completed', 'canceled'];
const randomDealStatus = dealStatuses[Math.floor(Math.random() * dealStatuses.length)];

const deal: DealForMyPage = {
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
  status: randomDealStatus,
  dealEvents: [
    {
      id: 1,
      actorType: 'seller',
      eventType: 'listing',
      createdAt: '2021-01-01 00:00:00',
    }
  ]
}
const snakeCaseResponseJson = humps.decamelizeKeys(deal);
  
export async function GET(request: Request) {
  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}
