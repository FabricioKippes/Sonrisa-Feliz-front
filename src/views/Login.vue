<template>
  <div class="login">
    <FormLogin />
  </div>
</template>

<script>
  import FormLogin from '@/components/FormLogin.vue'
  export default {
    components: {
      FormLogin
    }
  }
</script>

<style lang="scss" scoped>
.login {
  // centramos horizontal y vertical
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/pattern.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment:fixed;
  padding: 5rem;
}
</style>
