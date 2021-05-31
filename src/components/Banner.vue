<template>
  <div id="banner">
    <div class="texto">
      <h1>Sonríe con confianza</h1>
      <p>
        Sonrisa Feliz te asegura una cálida experiencia con un nuevo concepto de atención, diagnóstico, tratamiento y estética odontológica.
        Somos una clínica de la ciudad de Resistencia, Chaco, dedicada a la Radiología, Implantología y Ortodoncia. Contamos con un equipo humano de profesionales de la salud altamente calificados y perseguimos el bienestar de nuestros pacientes.
      </p>
      <hr />
      <p class="nombre">Dr. Ana Sonrisa</p>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  #banner {
    background-image: url('~@/assets/fondo-banner.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    display: flex;
    align-items: center;
    justify-content: center;

    .texto {
      flex: 0 1 50%;
      padding: calc(5rem + 15px);
      text-align: left;
      color: white;
      background-color: rgba($color: $principal, $alpha: 0.8);

      @media (max-width: 500px) {
        padding: 3rem calc(1rem + 15px);
      }

      hr {
        border-color: white
      }

      p.nombre {
        font-style: italic;
        font-weight: bold;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;

      .texto {
        text-align: center;
        width: 100%;
      }
    }
  }

</style>
