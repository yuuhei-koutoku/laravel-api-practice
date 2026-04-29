import type { Deal } from '@/types/responseType'
const humps = require('humps');

const imageUrls = [
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const deals: Deal[] = [
  {
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
    status: "purchased"
  },
  {
    id: 2,
    product: {
      id: 2,
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
    status: "canceled"
  },
  {
    id: 3,
    product: {
      id: 3,
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
    status: "completed"
  },
];

export default function handler(_req, res) {
  const snakeCaseResponseJson = humps.decamelizeKeys({ deals: deals });
  res.status(200).json(snakeCaseResponseJson);
}
