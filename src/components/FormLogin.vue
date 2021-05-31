<template>
  <form
    action
    class="form"
    @submit.prevent="send">
    <h1 class="title">{{ title }}</h1>
    <label
      class="form-label"
      for="#email">Email:</label>
    <input
      id="email"
      v-model="email"
      class="form-input"
      required
      type="email">
    <label
      v-if="type!=1"
      class="form-label"
      for="#password">Contraseña:</label>
    <input
      v-if="type!=1"
      id="password"
      v-model="password"
      class="form-input"
      type="password">
    <p
      v-if="error"
      class="error">Has introducido mal el email o la contraseña.</p>
    <input
      class="form-submit"
      type="submit"
      value="Enviar">
    <p class="registro">¿No tienes una cuenta?
      <router-link to="/register">Regístrate</router-link>
    </p>
    <a
      v-if="type!=0"
      href="javascript:void(0)"
      @click="type=0">Iniciar Sesión</a>

    <p
      v-if="type!=1"
      class="recupero">¿Olvidaste tu Contraseña?
      <a
        href="javascript:void(0)"
        @click="type=1">Recupérala</a>
    </p>
  </form>
</template>

<script>
  export default {
    data: () => ({
      type:0,
      email: "",
      password: "",
      error: false,
    }),
    computed: {
      title(){
        return (this.type==0)?'Iniciar Sesión':'Recuperar Contraseña';
      }
    },
    methods: {
      send() {
        if(this.type==0) {
          const credenciales = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('login', credenciales)
        } else {
          this.$confirm('¿Se ha extraviado su contraseña y quiere comenzar el proceso de recupero?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('recover', this.email)
          }).catch(() => {
          })
        }
      }
    }
  };
</script>

<style lang="scss">
@media (max-width: 600px) {
     .form {
       min-width: 300px !important;
     }
  }
a {
  margin-right: auto;
  margin-left:auto;
}
a:link, a:visited, a:active {
            text-decoration:none;
        }
.title {
  text-align: center;
  margin-bottom:1.5rem;
}
.form {
  background-color:white;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 400px;
  max-width: 100%;
  min-height: 400px;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border:none;
    border-bottom: 1px solid black;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: white;
  border-color:$tercero;
  color: $tercero;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: $tercero;
    color:white;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
.registro {
  margin-top: 1.5rem;
  text-align: center;
}
.recupero {
  text-align: center;
}
</style>
