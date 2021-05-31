const TOKEN = 'user_token'
const USER = 'user'
const LANG = 'lang'

export default {
  getToken () {
    return localStorage.getItem(TOKEN)
  },

  saveToken (token) {
    localStorage.setItem(TOKEN, token)
  },

  removeToken () {
    localStorage.removeItem(TOKEN)
  },

  getUser () {
    return JSON.parse(localStorage.getItem(USER))
  },

  saveUser (user) {
    localStorage.setItem(USER, JSON.stringify(user))
  },

  removeUser () {
    localStorage.removeItem(USER)
  },

  getUserToken () {
    return {
      user: JSON.parse(localStorage.getItem(USER)),
      token: localStorage.getItem(TOKEN)
    }
  },

  saveUserToken (user, token) {
    localStorage.setItem(USER, JSON.stringify(user))
    localStorage.setItem(TOKEN, token)
  },

  removeUserToken () {
    localStorage.removeItem(USER)
    localStorage.removeItem(TOKEN)
  },

  isLogged () {
    return this.getToken() !== null && this.getUser() !== null
  },

  getLang() {
    return localStorage.getItem(LANG)
  },

  saveLang(lang) {
    localStorage.setItem(LANG, lang)
  },

  removeLang() {
    localStorage.removeItem(LANG)
  },

}
