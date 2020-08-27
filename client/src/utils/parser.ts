import { KR_WEEKDAY } from "./constants"

export const parseToLocalMoneyString = (money: number): string => {
  return String(money).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const replaceSlashesWithHyphens = (str: String) => {
  return str.replace(/\//g, '-')
}

export const replaceHyphensWithSlashes = (str: String) => {
  return str.replace(/-/g, '/')
}

export const replaceHyphensWithCommas = (str: String) => {
  return str.replace(/-/g, ', ')
}

export const replaceSlashesWithCommas = (str: String) => {
  return str.replace(/\//g, ', ')
}

export const toLocalDateString = (isoString: string) => {
  const dateObj = new Date(isoString)
  const month = dateObj.getMonth() + 1
  const weekday = KR_WEEKDAY[dateObj.getDay()]
  const date = dateObj.getDate()
  return `${month}/${date} (${weekday})`
}