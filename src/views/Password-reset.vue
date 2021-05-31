<template>
  <div class="container-recupero">
    <form
      action
      class="form"
      @submit.prevent="changePassword">
      <h1 class="title">Cambio de Contraseña</h1>
      <label
        class="form-label"
        for="#password">Nueva Password:</label>
      <input
        id="password"
        v-model="user.password"
        class="form-input"
        required
        type="password">
      <label
        class="form-label"
        for="#confirmPassword">Confirmación de Password:</label>
      <input
        id="confirmPassword"
        v-model="user.confirmPassword"
        class="form-input"
        required
        type="password">
      <input
        class="form-submit"
        type="submit"
        value="Cambiar Password">
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        user: {
          token: this.$route.params.token,
          password:'',
          confirmPassword:''
        }
      }
    },
    methods: {
      changePassword() {
        if (this.user.password === this.user.confirmPassword){
          this.$store.dispatch('changePassword', this.user)
        } else {
          Vue.toasted.global.error('La password y confirmación no coinciden')
        }
      }
    }
  }
</script>

<style lang="scss">
.container-recupero {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/pattern.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment:fixed;
  padding: 5rem;
}
// .reset-password {
//   background-color:white;
//   margin: auto auto;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 20%;
//   min-width: 350px;
//   max-width: 100%;
//   min-height: 500px;
//   border-radius: 10px;
//   padding: 30px;
//   box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
// }

</style>
