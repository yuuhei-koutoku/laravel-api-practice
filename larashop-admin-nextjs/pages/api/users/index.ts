import { User, PaginationMeta, UserPagination } from '@/types/responseType'
const humps = require('humps');

const users: User[] = [
  {
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
  {
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
  {
    id: 3,
    nickname: "やまちゃん",
    profileImageUrl: "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "山ちゃんです。よろしくお願いします！",
    email: "test@example.com",
    name: "山田 太郎",
    postalCode: "1234567",
    address: "東京都渋谷区道玄坂2-1-1",
    tel: "09012345678"
  },
  {
    id: 4,
    nickname: "やまちゃん",
    profileImageUrl: "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "山ちゃんです。よろしくお願いします！",
    email: "test@example.com",
    name: "山田 太郎",
    postalCode: "1234567",
    address: "東京都渋谷区道玄坂2-1-1",
    tel: "09012345678"
  },
  {
    id: 5,
    nickname: "やまちゃん",
    profileImageUrl: "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "山ちゃんです。よろしくお願いします！",
    email: "test@example.com",
    name: "山田 太郎",
    postalCode: "1234567",
    address: "東京都渋谷区道玄坂2-1-1",
    tel: "09012345678"
  },
]

const meta: PaginationMeta = {
  currentPage: 1,
  from: 1,
  to: 5,
  total: 7,
  perPage: 5,
  lastPage: 2
}

const userPagination: UserPagination = {
  data: { users: users },
  meta: meta
}

export default function handler(_req, res) {
  const snakeCaseResponseJson = humps.decamelizeKeys(userPagination);
  res.status(200).json(snakeCaseResponseJson);
}