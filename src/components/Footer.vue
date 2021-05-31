<template>
  <div id="footer">
    <div class="d-flex footer">
      <div class="logo-gris footer-item">
        <span>Copyright © 2020 - Sonrisa Feliz</span>
        <span><strong> Consultorio de salud y estética dental</strong></span>
        <span>Telefono: 0362 412-3456</span>
        <span>Dirección: French 414</span>
      </div>
      <div class="footer-item footer-text">
        <div><Redes /></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Redes from '@/components/Redes.vue'
  export default {
    components: {
      Redes
    }
  }
</script>

<style lang="scss">
  #footer {
    box-shadow: 0 -5px 10px rgba($color: #000000, $alpha: .2);
    z-index: 200;
    position: relative;
    background-color: white;
  }
  .footer {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2rem 5rem;

    span {
      display: block;
    }
  }
  .footer-text {
    text-align: right;
  }
  @media (max-width: 500px) {
    .footer {
      align-items: center;
      flex-direction: column;

      span {
        text-align: center;
      }
    }
    .footer-text {
      text-align: center;
    }
  }
</style>
