export const parseToLocalMoneyString = (money: number): string => {
  return String(money).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}
