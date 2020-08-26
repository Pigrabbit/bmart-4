const jwt = require('jsonwebtoken')

export const parseCookieToJson = (cookie: string) => {
  return Object.fromEntries(cookie.split('; ').map((x) => x.split('=')))
}

export const clearCookie = () => {
  document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

export const decodeToken = (token: string) => {
  return jwt.decode(token)
}

export const saveJsonToLocalStorage = (jsonObj: any) => {
  Object.keys(jsonObj).map((key) => {
    localStorage.setItem(key, jsonObj[key])
  })
}
