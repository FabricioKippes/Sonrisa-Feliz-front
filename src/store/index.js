import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router"
import cks from '@/logic/cookies'
import _ from 'lodash'
import moment from 'moment'

Vue.use(Vuex)

const initialState = () => ({
  token: cks.getToken(),
  user: cks.getUser(),
  obras_sociales: [],
  prestaciones: [],
  turnos_disponibles: null,
  turnos_disponibles_admin: [],
  turnos_asignados_admin: [],
  turnos_usuario: [],
  pacientes: [],
  historias_clinicas: [],
  historias_paciente: [],
  isWeb: true
})

export default new Vuex.Store({
  state: initialState(),

  mutations: {
    RESET(state) {
      cks.clearCookies()
      Object.assign(state, initialState())
    },

    SET_USER(state, data) {
      state.user = data.usuario
      state.tipo = data.usuario.tipo
      cks.setUser(data)
    },
    SET_TOKEN(state,data) {
      state.token = data
      cks.setToken(data)
    },
    SET_OBRAS_SOCIALES(state, data) {
      state.obras_sociales = data
    },
    SET_PRESTACIONES(state, data) {
      state.prestaciones = data
    },
    SET_TURNOS_DISPONIBLES(state, turnos) {
      state.turnos_disponibles = turnos
    },
    SET_TURNOS_DISPONIBLES_ADMIN(state, turnos) {
      state.turnos_disponibles_admin = turnos
    },
    SET_TURNOS_ASIGNADOS_ADMIN(state, turnos) {
      state.turnos_asignados_admin = turnos
    },
    SET_TURNOS_USUARIO(state, turnos) {
      state.turnos_usuario = turnos
    },
    SET_PACIENTES(state, data) {
      state.pacientes = data
    },
    SET_HISTORIAS_CLINICAS(state, data) {
      state.historias_clinicas = data
    },
    SET_HISTORIAS_PACIENTE(state, data) {
      state.historias_paciente = data
    },
  },

  actions: {
    // USUARIO
    changePassword(context, password ) {
      Vue.axios.put('usuarios/password', password )
        .then(response => {
          Vue.toasted.global.success('El cambio de contraseña se realizó correctamente.')
          router.push({ name: 'Login' })
          // .catch(() => { })
        })
        .catch(error => {
          this._vm.$toastErrors(error.response?.data?.error)
        })
    },

    recover(context, email) {
      Vue.axios.post("usuarios/password", { email })
        .then(response => {
          router.go()
          Vue.toasted.global.success('Revíse su email de registro.')
        })
        .catch(error => {
          this._vm.$toastErrors(error.response?.data?.data?.errors)
        })
    },

    register(context, user) {
      Vue.axios.post("usuarios", user)
        .then(response => {
          router.push({ name: 'Login' }).catch(() => { })
          Vue.toasted.global.success('Usuario registrado exitosamente!')
        })
        .catch(error => {
          this._vm.$toastErrors(error.response?.data?.data?.errors)
        })
    },

    login({ commit }, credenciales) {
      Vue.axios.post("usuarios/login", credenciales)
        .then(response => {
          commit('SET_USER', response?.data?.data)
          commit('SET_TOKEN', response?.data?.data.token)
          if(response?.data?.data.usuario.tipo === 'admin')
          router.push({ name: 'TurnoAdmin' }).catch(() => {})
          else router.push({ name: 'Turnos' }).catch(() => {})
        }).catch(error => {
          this._vm.$toastErrors(error.response?.data?.data?.errors)
        })
    },

    logout({ commit }) {
      commit('RESET')
      router.push({ name: 'Login' })
    },

    refresh({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post('usuarios/refresh')
          .then(response => {
            const token = response?.data?.data.token
            commit('SET_TOKEN', token)
            resolve(token)
          })
          .catch(error => reject(error))
      })
    },

    updateUser({ state, commit }, user) {
      return new Promise(resolve => {
        Vue.axios
          .put(`usuarios/${state.user.id}`, user)
          .then(response => {
            commit('SET_USER', response?.data?.data)
            Vue.toasted.global.success('Datos modificados exitosamente!')
          })
          .catch(error => {
            this._vm.$toastErrors(error.response?.data?.data)
          })
          .finally(() => {
            resolve()
          })
      })
    },

    // OBRAS SOCIALES
    fetchObrasSociales({ commit }) {
      Vue.axios
        .get('obras-sociales')
        .then(response => {
          commit('SET_OBRAS_SOCIALES', response?.data?.data.obras_sociales)
        }).catch(error => {
          this._vm.$toastErrors(error.response?.data?.data)
        })
    },
    crearObraSocial(context, os ) {
      Vue.axios
        .post("obras-sociales", os )
        .then(response => {
          Vue.toasted.global.success('La Obra Social se creo correctamente')
          this.dispatch('fetchObrasSociales')
        })
        .catch(error => {
          this._vm.$toastErrors(error.response?.data?.data?.errors)
        })
    },
    modificarObraSocial(context, os) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .put(`obras-sociales/${os.id}`, os)
          .then(() => {
            Vue.toasted.global.success('La Obra Social modificada correctamente')
            this.dispatch('fetchObrasSociales')
            resolve()
          })
          .catch(error => {
            reject(error.response?.data?.data)
            Vue.toasted.global.error(error.response?.data?.error)
          })
      })
    },
    quitarObraSocial(context, id) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .delete(`obras-sociales/${id}`)
          .then(() => {
            Vue.toasted.global.success('Obra Social eliminado correctamente')
            this.dispatch('fetchObrasSociales')
            resolve()
          })
          .catch(error => {
            reject(error.response?.data?.error)
          })
      })
    },
    //HISTORIAS CLINICAS
    fetchHistoriasClinicas({ commit }) {
      Vue.axios
        .get('historias-clinicas')
        .then(response => {
          commit('SET_HISTORIAS_CLINICAS', response?.data?.data.historias_clinicas)
        }).catch(error => {
          this._vm.$toastErrors(error.response?.data?.error)
        })
    },
    //historia por paciente
    fetchHistoriaPaciente({ commit }, dni) {
      return new Promise((resolve, reject) => {
        Vue.axios
        .get(`pacientes/${dni}/historias`)
        .then(response => {
          commit('SET_HISTORIAS_PACIENTE', response?.data?.data.historias_clinicas)
          resolve()
        }).catch(error => {
          reject(error.response?.data?.error)
        })

      })

    },
    crearHistoriaClinica(context, historia_clinica ) {
      return new Promise(resolve => {
        Vue.axios
          .post("historias-clinicas", historia_clinica )
          .then(response => {
            Vue.toasted.global.success('La Historia clinica se creo correctamente.')
          })
          .catch(error => {
            this._vm.$toastErrors(error.response?.data?.data?.errors)
          })
          .finally(() => {
            resolve()
          })
      })
    },
    //PAGO
    abonoPractica({ dispatch }, pago) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post("pagos", pago, { responseType: 'blob' })
          .then(response => {
            dispatch('fetchTurnosUsuario')
            Vue.toasted.global.success('El abono se realizó correctamente.')
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'factura.pdf'); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
            resolve()
          }).catch(error => {
            reject(error.response?.data?.error)
          })
      })
    },
      // PACIENTES
      fetchPacientes({ commit }) {
        Vue.axios
          .get('pacientes')
          .then(response => {
            commit('SET_PACIENTES', response?.data?.data.pacientes)
          }).catch(error => {
            this._vm.$toastErrors(error.response?.data?.error)
          })
      },
      downloadHistoriaPaciente({ commit }, dni) {
        Vue.axios
          .get(`pacientes/${dni}/historias/download`, { responseType: 'blob' })
          .then(response =>{
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${dni}.docx`); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch(error => {
            this._vm.$toastErrors("Se produjo un error al descargar el archivo")
          })
      },
      // PRESTACIONES
      fetchPrestaciones({ commit }) {
        Vue.axios
          .get('prestaciones')
          .then(response => {
            commit('SET_PRESTACIONES', response?.data?.data.prestaciones)
          }).catch(error => {
            this._vm.$toastErrors(error.response?.data?.error)
          })
      },
      crearPrestacion(context, prestacion ) {
        Vue.axios
          .post("prestaciones", prestacion )
          .then(response => {
            Vue.toasted.global.success('La Prestación se creo correctamente.')
            this.dispatch('fetchPrestaciones')
          })
          .catch(error => {
            this._vm.$toastErrors(error.response?.data?.data?.errors)
          })
      },
      modificarPrestacion(context, prestacion) {
        return new Promise((resolve, reject) => {
          Vue.axios
            .put(`prestaciones/${prestacion.id}`, prestacion)
            .then(() => {
              Vue.toasted.global.success('La prestación fue modificada correctamente')
              this.dispatch('fetchPrestaciones')
              resolve()
            })
            .catch(error => {
              reject(error.response?.data?.error)
              Vue.toasted.global.error(error.response?.data?.error)
            })
        })
      },
      quitarPrestacion(context, id) {
        return new Promise((resolve, reject) => {
          Vue.axios
            .delete(`prestaciones/${id}`)
            .then(() => {
              Vue.toasted.global.success('Prestación eliminada correctamente')
              this.dispatch('fetchPrestaciones')
              resolve()
            })
            .catch(error => {
              reject(error.response?.data?.error)
            })
        })
      },
    // TURNOS

    fetchTurnosDisponibles({ commit }) {
      Vue.axios
        .get('turnos/disponibles')
        .then(response => {
          commit('SET_TURNOS_DISPONIBLES', response?.data?.data.turnos)
        }).catch(error => {
          this._vm.$toastErrors(error.response?.data?.data)
        })
    },

    fetchTurnosUsuario({ commit }) {
      Vue.axios
        .get('pacientes/turnos')
        .then(response => {
          let turnos = response?.data?.data.turnos
          commit('SET_TURNOS_USUARIO', turnos)
        }).catch(error => {
          this._vm.$toastErrors(error.response?.data?.data)
        })
    },

    solicitarTurno(context, data) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .put(`turnos/${data.turno.id}`, data)
          .then(() => {
            Vue.toasted.global.success('Turno solicitado correctamente, nos contactaremos a la brevedad')
            this.dispatch('fetchTurnosUsuario')
            this.dispatch('fetchTurnosDisponibles')
            resolve()
          })
          .catch(error => {
            reject(error.response?.data?.data)
          })
      })
    },

    quitarTurno(context, id) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .put(`turnos/${id}/liberar`)
          .then(() => {
            Vue.toasted.global.success('Turno eliminado correctamente')
            this.dispatch('fetchTurnosUsuario')
            this.dispatch('fetchTurnosDisponibles')
            resolve()
          })
          .catch(error => {
            reject(error.response?.data?.data)
          })
      })
    },
    //TURNOS ADMIN
    crearTurno(context, turno ) {
      Vue.axios
        .post("turnos", turno )
        .then(response => {
          Vue.toasted.global.success('Su petición se efectuó correctamente.')
          this.dispatch('fetchTurnos')
        })
        .catch(error => {
          this._vm.$toastErrors(error.response?.data?.data?.errors)
        })
    },
    fetchTurnos({ commit }) {
      Vue.axios
        .get('turnos')
        .then(response => {
          let turnos_libres = response?.data?.data.turnos.libres
          let turnos_ocupados = response?.data?.data.turnos.ocupados
          commit('SET_TURNOS_DISPONIBLES_ADMIN', turnos_libres)
          commit('SET_TURNOS_ASIGNADOS_ADMIN', turnos_ocupados)
        }).catch(error => {
          this._vm.$toastErrors(error.response?.data?.data)
        })
    },
    quitarTurnoAdmin(context, id) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .delete(`turnos/${id}`)
          .then(() => {
            Vue.toasted.global.success('Turno eliminado correctamente')
            this.dispatch('fetchTurnos')
            resolve()
          })
          .catch(error => {
            reject(error.response?.data?.data.error)
          })
      })
    },
  },

  getters: {
    isAdmin: state => {
      return state.user.tipo === 'admin';
    },
    getUser: state => {
      return state.user
    },

    getObrasSociales: state => {
      return state.obras_sociales ?? initialState().obras_sociales
    },
    getHistoriasClinicas: state => {
      return state.historias_clinicas ?? initialState().historias_clinicas
    },
    getHistoriasPaciente: state => {
      return state.historias_paciente ?? initialState().historias_paciente
    },
    getPrestaciones: state => {
      return state.prestaciones ?? initialState().prestaciones
    },
    getPacientes: state => {
      return state.pacientes ?? initialState().pacientes
    },
    getTurnosDisponibles: state => {
      return state.turnos_disponibles ?? initialState().turnos_disponibles
    },
    getTurnosDisponiblesAdmin: state => {
      return state.turnos_disponibles_admin ?? initialState().turnos_disponibles_admin
    },
    getTurnosAsignadosAdmin: state => {
      return state.turnos_asignados_admin ?? initialState().turnos_asignados_admin
    },
    getTurnosUsuario: state => {
      return state.turnos_usuario ?? initialState().turnos_usuario
    }
  }
})
