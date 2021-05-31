<template>
  <div id="information">
    <div class="information-content">
      <div class="col-12 col-lg-6 mb-5">
        <div>
          <h3>#Covid19</h3>
          <h2 class="w-100 border-bottom pb-3 mb-3">Nos cuidamos entre todos</h2>
          <p>
            El avance del coronavirus lleva a tomar medidas preventivas y
            de responsabilidad social dentro de las comunidades en las
            que convivimos. Por eso es que el Consultorio Sonrisa Feliz
            solo estamos brindando turnos a casos que realmente lo requieran.
          </p>
          <p>
            Si considera que podría haber estado expuesto al virus,
            por favor haganoslo saber en el formulario de solicitud de
            consultas para que podamos tener los recaudos necesarios.
            Desde ya muchas gracias.
          </p>
        </div>
        <div class="d-flex mt-3">
          <router-link
            tag="el-button"
            to="/login">
            Iniciar sesión
          </router-link>
          <router-link
            class="mr-2 el-button--primary"
            tag="el-button"
            to="/register">
            Registrarse
          </router-link>
        </div>
      </div>
      <div class="col-12 col-lg-6 mt-2">
        <b-embed
          aspect="16by9"
          src="https://www.youtube.com/embed/3t85P5ui7q0?rel=0"
          type="iframe">
        </b-embed>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  #information {
    background-color: #eee;

    .information-content {
      display: flex;
      padding: 5rem;
      flex-wrap: wrap;

      @media (max-width: 500px) {
        padding: 3rem 1rem;
      }
    }
    h3 {
      color: $principal;
      font-weight: bold;
      font-size: 1.5rem;
    }

    h2 {
      font-weight: bold;
      font-size: 1.8rem;
    }
  }
</style>
