import { getShop } from "@/axios/shops"

export default function handler(req, res) {
  const token = req.cookies.nvcJWT;
  console.log(token)
}