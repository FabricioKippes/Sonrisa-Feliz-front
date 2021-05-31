<template>
  <el-aside width="250px">
    <el-menu
      active-text-color="#22c9fb"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-active="activeLink"
      router
      text-color="#fff">
      <span
        v-if="!isCollapse"
        class="usuario">
        Hola!, {{ nombre }}
      </span>
      <el-tooltip
        class="item"
        content="Obras Sociales"
        effect="dark"
        placement="right">
        <el-menu-item index="/dashboard/obrasocial">
          <font-awesome-icon :icon="['fa', 'first-aid']" />
          <span class="menu">Obras Sociales</span>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip
        class="item"
        content="Prestaciones"
        effect="dark"
        placement="right">
        <el-menu-item index="/dashboard/prestaciones">
          <font-awesome-icon :icon="['fa', 'hand-holding-medical']" />
          <span class="menu">Prestaciones</span>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip
        class="item"
        content="Turnos"
        effect="dark"
        placement="right">
        <el-menu-item index="/dashboard/turnoadmin">
          <font-awesome-icon :icon="['fa', 'calendar-check']" />
          <span class="menu">Turnos</span>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip
        class="item"
        content="Pacientes"
        effect="dark"
        placement="right">
        <el-menu-item index="/dashboard/paciente">
          <font-awesome-icon :icon="['fa', 'users']" />
          <span class="menu">Pacientes</span>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip
        class="item"
        content="Modificar Datos"
        effect="dark"
        placement="right">
        <el-menu-item index="/dashboard">
          <font-awesome-icon :icon="['fas', 'user-cog']" />
          <span class="menu">Modificar datos</span>
        </el-menu-item>
      </el-tooltip>

    </el-menu>
  </el-aside>
</template>

<script>

  export default {
    name:'SidebarAdmin',
    data() {
      return {
        isCollapse: '',
        activeLink: null
      }
    },
    methods: {
      setCollapse(){
        this.isCollapse = window.innerWidth < 900
      }
    },
    mounted () {
      this.activeLink = this.$route.path
      this.setCollapse()
      window.onresize = () => {this.setCollapse()}
    },
    watch: {
      $route (newVal, oldVal) {
        this.activeLink = newVal.path
      }
    },

    computed: {
      user() {
        return this.$store.getters.getUser
      },
      nombre() {
        let nombre = 'Dr. Ana Sonrisas'
        return nombre
      }
    }
  }
</script>

<style lang="scss">
  @media (max-width: 900px) {
    .usuario {
    color: #545c64 !important;
    }
    .el-aside {
      width:64px !important;
    }
  }

  .el-menu {
    height: 100%;
    padding: 3rem 0;
  }

  .menu {
    margin-left:15px;
  }


  .usuario {
    color: $tercero;
    padding: 1rem 1.8rem;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    width: 100%;
    display: block;
  }
</style>
