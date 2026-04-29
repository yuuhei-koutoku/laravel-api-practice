import { AdminUser } from '@/types/responseType'
const humps = require('humps');

export default function handler(_req, res) {

  const user: AdminUser = {
    id: 1,
    email: "test@example.com",
    name: "Larashop Admin",
  }
  const snakeCaseResponseJson = humps.decamelizeKeys(user);
  res.status(200).json(snakeCaseResponseJson);
}
