"use strict"

import Vue from 'vue'
import axios from "axios"
import cks from './cookies'
import store from '@/store'

let config = {
  baseURL: process.env.VUE_APP_API_URL || ''
}

let isRefreshing = false
let requestsQueue = []

function proccessQueued(token) {
  requestsQueue.map(cb => cb(token))
}

function queueRequests(cb) {
  requestsQueue.push(cb)
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    const token = cks.getToken()

    if (token != null) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(null, error => {
  const { config } = error

  // Logout user if it wasn't possible to refresh the token
  if (config.url.includes('usuarios/refresh')) {
    cks.clearCookies()
    store.dispatch('logout')
    return Promise.reject(error)
  }

  // Return the error if it's not related to authentication or if user is not authenticated
  if (error.response?.status !== 401 || !cks.isLogged()) {
    return Promise.reject(error)
  }

  // start token refreshing process if it's not in progress
  if (!isRefreshing) {
    isRefreshing = true
    store.dispatch('refresh')
      .then(token => {
        isRefreshing = false
        proccessQueued(token)
        requestsQueue = []
      })
  }

  // add a callback for every request that needs a new token
  return new Promise(resolve => {
    queueRequests(token => {
      config.headers['Authorization'] = "Bearer " + token
      resolve(axios.request(config))
    })
  })
})

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
