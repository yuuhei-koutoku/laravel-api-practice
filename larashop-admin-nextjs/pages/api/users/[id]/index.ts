import { User } from '@/types/responseType'
const humps = require('humps');

const user: User = {
    id: 1,
    nickname: "やまちゃん",
    profileImageUrl: "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "山ちゃんです。よろしくお願いします！",
    email: "test@example.com",
    name: "山田 太郎",
    postalCode: "1234567",
    address: "東京都渋谷区道玄坂2-1-1",
    tel: "09012345678"
}

export default function handler(_req, res) {
  const snakeCaseResponseJson = humps.decamelizeKeys(user);
  res.status(200).json(snakeCaseResponseJson);
}