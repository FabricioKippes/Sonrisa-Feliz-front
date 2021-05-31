<template>
  <form
    action
    class="form"
    @submit.prevent="login">
    <h1 class="title">Recupero de Contraseña</h1>
    <label
      class="form-label"
      for="#email">Email:</label>
    <input
      id="email"
      v-model="email"
      class="form-input"
      required
      type="email">
    <p
      v-if="error"
      class="error">Has introducido mal el email o la contraseña.</p>
    <input
      class="form-submit"
      type="submit"
      value="Login">
    <p class="registro">¿No tienes cuenta?
      <router-link to="/register">Regístrate</router-link>
    </p>
    <p class="recupero">Disfruta nuestros servicios
      <a href="javascript:void(0)"></a>
      <router-link to="/login">Ingresar</router-link>
    </p>
  </form>
</template>

<script>
  import auth from "@/logic/auth";
  export default {
    data: () => ({
      email: "",
      error: false,
      type:0
    }),
    methods: {
      async login() {
        auth
          .login(this.email, this.password)
          .then(() =>{
            auth.setUserLogged({email: this.email});
            this.$router.push("/");
          }).catch(() => {
            this.error = true
          })
      }
    }
  };
</script>

<style lang="scss">
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
  min-height: 500px;
  height: 100%;
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