import type { DealDetail } from '@/types/responseType'
const humps = require('humps');

const imageUrls = [
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const deal: DealDetail = {
  id: 1,
  product: {
    id: 1,
    name: "Nike Air Max 270",
    description: "Good Nike Air Max",
    imageUrl: imageUrls[0],
    imageUrls: imageUrls,
    price: 10000,
  },
  seller: {
    id: 1,
    nickname: "やまちゃん",
    profileImageUrl: "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "山ちゃんです。よろしくお願いします！",
    email: "test@example.com",
    name: "山田 太郎",
    postalCode: "1234567",
    address: "東京都渋谷区道玄坂2-1-1",
    tel: "09012345678"
  },
  buyer: {
    id: 2,
    nickname: "やまちゃん",
    profileImageUrl: "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "山ちゃんです。よろしくお願いします！",
    email: "test@example.com",
    name: "山田 太郎",
    postalCode: "1234567",
    address: "東京都渋谷区道玄坂2-1-1",
    tel: "09012345678"
  },
  status: "purchased",
  dealEvents: [
    {
      id: 1,
      actorType: 'seller',
      eventType: 'listing',
      createdAt: '2021-01-01 00:00:00',
    }
  ]
}

export default function handler(_req, res) {
  const snakeCaseResponseJson = humps.decamelizeKeys(deal);
  res.status(200).json(snakeCaseResponseJson);
}
