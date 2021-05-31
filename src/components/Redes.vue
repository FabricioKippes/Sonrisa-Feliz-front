<template>
  <div class="redes">
    <a
      v-if="$store.state.isWeb"
      class="app"
      download
      href="/sonrisafelizapp.apk">
      <font-awesome-icon
        class="mr-2"
        :icon="['fas', 'mobile-alt']"
        size="lg" />
      Descargar App
    </a>
    <div><a href="#"><div class="icon"><i><font-awesome-icon
      :icon="['fab', 'facebook-square']"
      size="lg" /></i></div></a></div>
    <div><a href="#"><div class="icon"><i><font-awesome-icon
      :icon="['fab', 'twitter-square']"
      size="lg" /></i></div></a></div>
    <div><a href="#"><div class="icon"><i><font-awesome-icon
      :icon="['fab', 'instagram-square']"
      size="lg" /></i></div></a></div>
  </div>
</template>

<style lang="scss">
        .redes {
          display: flex;
          justify-content:flex-end;
          align-items: center;
          margin-top: 5px;

          .app {
            font-weight: 700;
            margin-right: 2rem;
          }
        }
          .icon {
            margin: 10px;
            font-size: 20px;
          }
          .icon i {
            color:$gris-oscuro;
          }
          div.icon:hover i {
          color:$principal;
          }
        @media (max-width: 768px) {
          .redes {
              justify-content: center;
          }
        }
</style>
