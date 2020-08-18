export const parseToLocalMoneyString = (money: number): string => {
  return String(money).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const replaceSlashesWithHyphens = (str: String) => {
  return str.replace(/\//g, '-')
}

export const replaceHyphensWithSlashes = (str: String) => {
  return str.replace(/\-/g, '/')
}

export const replaceHyphensWithCommas = (str: String) => {
  return str.replace(/\-/g, ', ')
}

export const replaceSlashesWithCommas = (str: String) => {
  return str.replace(/\//g, ', ')
}