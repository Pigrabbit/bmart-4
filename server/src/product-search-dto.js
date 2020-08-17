class ProductSearchDTO {
    constructor({
        id,
        name,
        category,
        price,
        base_price,
        discount_rate,
        sold_count,
        stock_count,
        coupang_product_id
    }) {
        this.id = id
        this.name = name
        this.category = category
        this.price = price
        this.base_price = base_price
        this.discount_rate = discount_rate
        this.sold_count = sold_count
        this.stock_count = stock_count
        this.coupang_product_id = coupang_product_id
    }
}

module.exports = ProductSearchDTO