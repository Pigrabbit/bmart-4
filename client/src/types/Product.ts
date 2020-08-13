export type ProductType = {
    id: number
    name: string
    coupang_product_id: number
    category: string
    price: number
    base_price?: number
    discount_rate?: number
    thumbnail_src: string
    created_at: string
    stock_count: number
    sold_count: number
    description?: string
}
