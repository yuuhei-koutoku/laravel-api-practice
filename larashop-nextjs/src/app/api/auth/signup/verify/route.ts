import type { AccessToken } from '@/types/responseType'
const humps = require('humps');

export async function POST(request: Request) {

  const formData = await request.json();
  const { token } = formData;


  if (token === "") {
    let errors: { field: string, detail: string }[] = []

    if (token === "") {
      errors.push({ field: "token", detail: "トークンを入力してください" })
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


  if (token !== "correct-token") {
    // 400エラーレスポンスを返す
    return new Response(JSON.stringify({
        message: "本登録処理に失敗しました。"
      }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
  }

  const accessToken: AccessToken = {
    accessToken: "valid_access_token",
    user: {
      id: 1,
      nickname: "test",
      profileImageUrl: "https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "test",
      email: "test@example.com",
      name: "test",
      postalCode: "1234567",
      address: "test",
      tel: "09012345678"
    }
  }
  const snakeCaseResponseJson = humps.decamelizeKeys(accessToken);

  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}
