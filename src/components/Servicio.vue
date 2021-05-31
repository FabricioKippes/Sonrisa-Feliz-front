<template>
  <div class="tarjeta">
    <div class="left">
      <b-img
        class="w-100"
        rounded="circle"
        :src="require('@/assets/servicio/' + servicio.imagen)"></b-img>
    </div>
    <div class="right">
      <h3>{{ servicio.titulo }}</h3>
      <p>{{ servicio. descripcion }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      servicio: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .tarjeta {
    display: flex;
    align-items: center;
    padding: 2.5rem;
    flex-direction: row;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 0 20px rgba(0,0,0,.2);
    height: 100%;
    justify-content: space-between;

    .left {
      flex: 0 0 250px;
      margin-right: 2rem;
    }

    .right {
      flex: 1 1 auto;
    }

    h3 {
      color: $tercero;
    }

    @media (max-width: 1280px) and (min-width: 769px) {
      flex-direction: column;
      text-align: center;
      flex-wrap: nowrap;

      .left {
        margin-right: 0;
        margin-bottom: 2rem;
      }
    }

    @media (max-width: 768px) {
      .left {
        flex: 0 0 150px;
        margin-right: 2rem;
      }

      .right {
        flex: 1 1 auto;
      }
    }

    @media (max-width: 500px) {
      flex-direction: column;
      text-align: center;
      flex-wrap: nowrap;

      .left {
        margin-right: 0;
        margin-bottom: 2rem;
      }
    }
  }
</style>
