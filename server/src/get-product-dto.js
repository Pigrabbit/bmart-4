class GetProductDTO {
  constructor ({
    id,
    name,
    category,
    price,
    basePrice,
    discountRate,
    soldCount,
    stockCount,
    coupangProductId,
    thumbnailSrc,
    isLiked,
  }) {
    this.id = id
    this.name = name
    this.category = category
    this.price = price
    this.basePrice = basePrice
    this.discountRate = discountRate
    this.soldCount = soldCount
    this.stockCount = stockCount
    this.coupangProductId = coupangProductId
    this.thumbnailSrc = thumbnailSrc
    this.isLiked = isLiked === 'true'
  }
}

module.exports = { GetProductDTO }
