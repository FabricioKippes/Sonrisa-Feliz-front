import Vue from 'vue'
import Toasted from 'vue-toasted'
import { icon } from '@fortawesome/fontawesome-svg-core'

export const handleErrors = (errors) => {
  if (Array.isArray(errors)) {
    errors.forEach(error => {
      Vue.toasted.global.error(error)
    })
  } else if (typeof errors === 'object' && errors !== null) {
    Object.values(errors).forEach(value => {
      handleErrors(value)
    })
  } else {
    Vue.toasted.global.error(errors)
  }
}

export const Toaster = {
  install(Vue, options) {
    Vue.use(Toasted, {
      iconPack: 'callback'
    })

    Vue.toasted.register('error',
      (payload) => {
        if (payload && typeof payload === 'string' )
          return payload
        return 'Ocurrió un error'
      },
      {
        theme: 'bubble',
        type: 'error',
        position: "top-right",
        duration: 5000,
        icon: (el) => {
          const check = icon({ prefix: 'fas', iconName: 'exclamation-circle' })
          el.innerHTML = check.html
          return el
        }
      }
    ) // example usage: this.$toasted.global.error(error)

    Vue.toasted.register('success',
      (payload) => {
        if (typeof payload === 'string')
          return payload

        if (payload.message)
          return payload.message

        return 'Operación exitosa'
      },
      {
        theme: 'outline',
        type: 'custom-success',
        position: "top-right",
        duration: 5000,
        icon: (el) => {
          const check = icon({ prefix: 'fas', iconName: 'check-circle' })
          el.innerHTML = check.html
          return el
        }
      }
    )
    Vue.prototype.$toastErrors = (errors) => {
      handleErrors(errors)
    }
  }
}

Vue.use(Toaster)
