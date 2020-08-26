class GetOrderHistoryDTO {
  constructor({
    id,
    user_id,
    ordered_at,
  }) {
    this.id = id
    this.userId = user_id
    this.orderedAt = (new Date(ordered_at)).toISOString()
  }
}

module.exports = { GetOrderHistoryDTO }
