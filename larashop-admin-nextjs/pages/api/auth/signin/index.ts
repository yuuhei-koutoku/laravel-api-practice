import type { AccessToken } from '@/types/responseType'
const humps = require('humps');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const accessToken: AccessToken = {
      accessToken: "valid_access_token",
      adminUser: {
        id: 1,
        email: "test@example.com",
        name: "Larashop Admin",
      }
    }
    const snakeCaseResponseJson = humps.decamelizeKeys(accessToken);

    res.status(200).json(snakeCaseResponseJson);
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}
