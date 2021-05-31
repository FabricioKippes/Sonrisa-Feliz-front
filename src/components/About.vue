<template>
  <div>
    <div id="banner-nos">
      <div class="img-nos">
        <h1>Dr. Ana Sonrisa</h1>
      </div>
      <div class="texto-nos">
        <div class="border-bottom pb-3">
          <h4>Nuestra Misión</h4>
          <p>Buscar nuevas oportunidades para ofrecer nuestros servicios a más pacientes, respeto incondicional
            con nuestros pacientes, amplio conocimiento del mercado y manejo profesional de los tratamientos odontológicos.</p>
        </div>
        <div class="border-bottom pb-3">
          <h4>Nuestra Visión</h4>
          <p>Ser el centro odontológico de referencia en Buenos Aires y Latinoamerica reconocido
            por su trayectoria, calidad de servicio, amplia experiencia y seguridad brindada a los pacientes.</p>
        </div>
        <div>
          <h4>Nuestros Valores</h4>
          <p>Logramos enfocarnos en el desarrollo de nuestros servicios al establecer que la excelencia
            es lo más importante, es por eso de nuestros resultados superiores, tanto en servicios ya establecidos
            como en innovaciones dentro de un campo de especialidad.
          </p>
        </div>
      </div>
    </div>
    <iframe
      id="ubicacion"
      allowfullscreen="false"
      aria-hidden="false"
      frameborder="0"
      height="350"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23191.793430602633!2d-58.98920659548948!3d-27.450171363322944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf0c84f0753%3A0x512936482d58a4a7!2sUTN%20-%20Facultad%20Regional%20Resistencia!5e0!3m2!1sen!2sar!4v1600562600310!5m2!1sen!2sar"
      width="100%" />
  </div>
</template>

<style lang="scss">
  #banner-nos {
    display:flex;
    flex-direction: row;

    .img-nos {
      position:relative;
      flex: 0 0 50%;
      background: url('~@/assets/nosotros/mujer.png') center / cover no-repeat;

      h1 {
        position: absolute;
        bottom: 10px;
        color:white;
        bottom: 0;
        padding: 3rem;
        width: 100%;
        margin-bottom: 0;
        background: url('~@/assets/nosotros/onda-naranja.svg') bottom left / auto 100% no-repeat;
      }
    }

    .texto-nos {
      flex: 0 0 50%;
      padding: calc(5rem + 15px);

      @media (max-width: 500px) {
        padding: 3rem calc(1rem + 15px);
      }

      > div:not(:last-child) {
        margin-bottom: 2rem;
      }

      h4 {
        color: $principal;
        font-weight: 500;
      }
    }

    @media (max-width: 834px) {
      flex-direction: column;

      .img-nos {
        background-position: center right;
        background-size: auto 100%;
        position: initial;
        background-color: $tercero;

        h1 {
          position: initial;
          background-image: none;
          margin-left: 9%;
          padding: 4rem 0;
          width: unset;
        }
      }
    }

    @media (max-width: 550px) {
      .img-nos {
        background-position: top center;
        background-size: 100% auto;
        position: initial;
        background-color: $tercero;

        h1 {
          position: initial;
          background-image: none;
          padding: 1rem 0;
          margin-top: 14rem;
          margin-left: 0;
          width: unset;
          background-color: $tercero;
          text-align: center;
        }
      }
    }
  }

  #ubicacion {
    margin-bottom: -6px;
  }
</style>
