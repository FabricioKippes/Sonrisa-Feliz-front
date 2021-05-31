<template>
  <div class="home">
    <Banner />
    <Informacion />
    <About />
  </div>
</template>

<script>
  import Banner from '@/components/Banner'
  import Informacion from '@/components/Informacion'
  import About from '@/components/About'

  export default {
    name: 'Home',
    components: {
      Banner,
      About,
      Informacion
    }
  }
</script>
