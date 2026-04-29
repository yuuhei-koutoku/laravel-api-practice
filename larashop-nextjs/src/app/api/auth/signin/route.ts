import type { AccessToken } from '@/types/responseType'
const humps = require('humps');

export type SigninParams = {
  email: string
  password: string
}

export async function POST(request: Request) {

  const formData = await request.json();
  const { email, password } = formData;

  if (email === "" || password === "") {
    let errors: { field: string, detail: string }[] = []

    if (email === "") {
      errors.push({ field: "email", detail: "メールアドレスを入力してください" })
    }
    if (password === "") {
      errors.push({ field: "password", detail: "パスワードを入力してください" })
    }
    // 422エラーレスポンスを返す
    return new Response(JSON.stringify({
      message: "バリデーションエラー",
      errors: errors
    }), {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (email !== 'test@example.com' || password !== "password") {
    // 400エラーレスポンスを返す
    return new Response(JSON.stringify({
      message: "メールアドレスまたはパスワードが違います"
    }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const accessToken: AccessToken = {
    accessToken: "valid_access_token",
    user: {
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
  }
  const snakeCaseResponseJson = humps.decamelizeKeys(accessToken);

  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}
