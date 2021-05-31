<template>
  <div id="fondito">
    <div id="f-dentales">
      <h2>Prestaciones dentales</h2>
      <div class="container">
        <div class="boxes">
          <servicio
            v-for="(servicio, index) in dentales"
            :key="index"
            :servicio="servicio" />
        </div>
      </div>
    </div>
    <div id="f-esteticas">
      <h2>Prestaciones estéticas</h2>
      <div class="container">
        <div class="boxes">
          <servicio
            v-for="(servicio, index) in esteticas"
            :key="'detales-' + index"
            :servicio="servicio" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { DENTALES, ESTETICAS } from "@/lista-servicios"
  import Servicio from '@/components/Servicio'
  export default {
    components: { Servicio },

    data() {
      return {
        dentales: DENTALES,
        esteticas: ESTETICAS
      }
    }
  }
</script>

<style lang="scss">
  #fondito {
    background-image: url('~@/assets/pattern.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment:fixed;

    #f-dentales,
    #f-esteticas {
      h2 {
        padding: 5rem 8%;
        color: #fff;
        text-align: right;
        width: 100%;
        line-height: 1;
        font-weight: bold;
        background: url('~@/assets/onda.svg') bottom right / cover no-repeat;

        @media (max-width: 500px) {
          text-align: center;
        }
      }

      .boxes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
        margin-bottom: 4rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }
    }

    #f-esteticas {
      min-height: 300px;
      padding-bottom: 3rem;
      background-color: rgba(34, 201, 251,.6);
    }
  }
</style>
