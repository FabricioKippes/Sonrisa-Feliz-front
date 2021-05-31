<template>
  <div class="header">
    <div class="logo">
      <router-link
        id="logo"
        tag="div"
        to="/">
        <img  src="@/assets/sf-logo.png">
      </router-link>
    </div>
    <div
      id="nav"
      class="">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/servicios">Servicios</router-link>|
      <router-link
        v-if="!user"
        to="/login">
        <font-awesome-icon :icon="['fa', 'user']" />
      </router-link>
      <el-dropdown
        v-else
        @command="handleCommand">
        <span class="el-dropdown-link">
          <font-awesome-icon :icon="['fas', 'user-cog']" />
          <font-awesome-icon
            class="ml-2"
            :icon="['fas', 'angle-down']" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="account"
            icon="el-icon-setting">Dashboard</el-dropdown-item>
          <el-dropdown-item
            command="logout"
            icon="el-icon-close">Cerrar Sesión</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'isAdmin',
        'getUser',
      ]),
      user() {
        return this.$store.getters.getUser
      }

    },

    methods:{
      handleCommand(command) {
        switch (command) {
          case 'logout': this.$store.dispatch('logout'); break
          case 'account':
            if(this.isAdmin) { this.$router.push({ name: 'TurnoAdmin' }).catch(()=>{}); break }
            else { this.$router.push({ name: 'Turnos' }).catch(()=>{}); break }

        }
      }
    }
  }
</script>

<style lang="scss">
  .name-user {
    font-weight: bold;
  }
  .logger {
    text-align: right;
    padding-right: 2rem;
    margin-top:10px;
    // p-top: 5px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: wrap;
    padding: 1rem 5%;
    box-shadow: 0 5px 10px rgba($color: #000000, $alpha: .2);
    position: relative;
    z-index: 100;
    background-color: white;

    #logo {
      cursor: pointer;
      max-height: 130px;

      img {
        max-height: 120px;
        width: auto;

        @media (max-width: 870px) {
          max-height: 80px;
        }
      }
    }

    #nav a {
      font-weight: bold;
      color: $gris-medio;
      margin-left: 30px;
      text-decoration: none;

      &:not(:last-child) {
        margin-right: 30px;
      }

      &:hover {
        color: $gris-oscuro;
      }
    }

    #nav a.router-link-exact-active {
      color: $tercero;
      padding-bottom: 5px;
      border-bottom: 2px solid $tercero;

    }

    @media (max-width: 678px) {
  #nav a {
      margin-left: 15px;
      &:not(:last-child) {
        margin-right: 15px;
      }
    }


      z-index: 100;
      position: relative;
      flex-direction: column;

      #logo, #nav {
        margin-bottom: 25px;
      }

      #logo img {
        max-height: 100px;
      }
    }
    .el-dropdown {
      margin-left:30px;
    }
  }
</style>
