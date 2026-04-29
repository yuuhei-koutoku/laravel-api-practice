import type { OperationResult } from '@/types/responseType'
const humps = require('humps');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const operationResult: OperationResult = {
      success: true
    }

    const snakeCaseResponseJson = humps.decamelizeKeys(operationResult);
    res.status(200).json(snakeCaseResponseJson);
  } else {
    // Other method handler. This can be customized as needed
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}
