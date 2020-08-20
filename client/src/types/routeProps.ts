export type ProductDetailRouteProps = {
  // url parameter로 전달되면 string으로 전달되기 때문에 number로 변경해 주어야 함
  productId: string
}
export type CategoryDashboardRouteProps = {
  categoryId: string
}
