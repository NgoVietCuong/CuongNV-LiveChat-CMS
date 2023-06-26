import instance from "./instance";

export function getShop() {
  return instance.get('/shops');
}