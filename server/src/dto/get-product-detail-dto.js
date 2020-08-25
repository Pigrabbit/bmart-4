class GetProductDetailDTO {
  constructor({ id, coupang_product_id, img_src }) {
    this.id = id
    this.coupangProductId = coupang_product_id
    this.src = `https://${img_src}`
  }
}

module.exports = { GetProductDetailDTO }
