
import Cookies from "js-cookie"
const TOKEN = 'token'
const USER = 'user'

export default {
  setUser(data) {
    Cookies.set(USER, JSON.stringify(data.usuario))
  },

  setToken(token) {
    Cookies.set(TOKEN , token)
  },

  getUser() {
    const user = Cookies.get(USER)
    if (user) return JSON.parse(user)
  },

  getToken() {
    return Cookies.get(TOKEN)
  },

  clearCookies() {
    Cookies.remove(USER)
    Cookies.remove(TOKEN)
  },

  isLogged() {
    return !!this.getToken() && !!this.getUser()
  }
}
