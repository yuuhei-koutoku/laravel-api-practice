import type { OperationResult } from '@/types/responseType'
const humps = require('humps');

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

  if (email === 'invalid@example.com') {
    // 400HTTPステータスを返す
    return new Response(JSON.stringify({
      message: "すでにそのメールアドレスは登録されています。"
    }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  // パスワードが4文字未満の場合はエラー
  if (password && password.length < 4) {
    // 400HTTPステータスを返す
    return new Response(JSON.stringify({
      message: "パスワードは4文字以上で入力してください。"
    }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const operationResult: OperationResult = {
    success: true
  }
  const snakeCaseResponseJson = humps.decamelizeKeys(operationResult);

  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}