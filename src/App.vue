<template>
  <div id="app">
    <Header v-if="showHeader" />
    <router-view />
    <Footer v-if="showHeader" />
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer.vue'
  export default {
    components: { Header, Footer },

    computed: {
      showHeader() {
        return !this.$route.meta.noHeader
      }
    }
  }
</script>

<style lang="scss">
@import '@/scss/_base.scss';
</style>
