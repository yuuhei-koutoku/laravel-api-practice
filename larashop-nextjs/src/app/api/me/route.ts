import { User } from '@/types/responseType'
const humps = require('humps');

const imageUrls = [
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

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
const snakeCaseResponseJson = humps.decamelizeKeys(user);
  
export async function GET(request: Request) {
  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}
  
export async function PUT(request: Request) {
  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}