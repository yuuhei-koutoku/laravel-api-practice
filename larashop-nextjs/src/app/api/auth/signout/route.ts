import type { OperationResult } from '@/types/responseType'
const humps = require('humps');

export async function POST(request: Request) {

  const operationResult: OperationResult = {
    success: true
  }
  const snakeCaseResponseJson = humps.decamelizeKeys(operationResult);

  // JSONを返す
  return new Response(JSON.stringify(snakeCaseResponseJson), {
    headers: { 'content-type': 'application/json' },
  });
}
