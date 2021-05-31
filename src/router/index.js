import Vue from 'vue'
import VueRouter from 'vue-router'
import cks from '@/logic/cookies'

// vistas
import Home from '../views/Home'
import Servicios from '../views/Servicios'
import Login from '../views/Login'
import Register from '../views/Register'
import Recupero from '../views/Password-reset'
import Dashboard from '../views/Dashboard'
import Cuenta from '../views/Cuenta'
import Turnos from '../views/Turnos'
import Obrasocial from '../views/Obrasocial'
import Prestaciones from '../views/Prestaciones'
import TurnoAdmin from '../views/TurnoAdmin'
import Paciente from '../views/Paciente'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: Servicios
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      noHeader: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      noHeader: true
    }
  },
  {
    path: '/password-reset/:token',
    name: 'Password-reset',
    component: Recupero,
    meta: {
      noHeader: true
    }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'Cuenta',
        component: Cuenta,
        meta: { requiresAuth: true }
      },
      {
        path: 'turnos',
        name: 'Turnos',
        component: Turnos,
        meta: { requiresAuth: true }
      },
      {
        path: 'obrasocial',
        name: 'Obrasocial',
        component: Obrasocial,
        meta: { requiresAuth: true }
      },
      {
        path: 'prestaciones',
        name: 'Prestaciones',
        component: Prestaciones,
        meta: { requiresAuth: true }
      },
      {
        path: 'turnoadmin',
        name: 'TurnoAdmin',
        component: TurnoAdmin,
        meta: { requiresAuth: true }
      },
      {
        path: 'paciente',
        name: 'Paciente',
        component: Paciente,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*', // fallback
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.requiresAuth)
  const isLogged = cks.isLogged()
  const admin = cks.getUser()

  if (authRequired && !isLogged) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isLogged) {
    if(admin.tipo === 'admin'){
      next({ name: 'TurnoAdmin' })
    }
    else {
    next({ name: 'Turnos' })
  }
  } else {
    next()
  }
})

export default router
