<template>
  <el-aside width="300px">
    <el-menu
      active-text-color="#22c9fb"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-active="activeLink"
      router
      text-color="#fff">
      <span class="usuario">
        Hola!, {{ nombre }}
      </span>
      <el-menu-item index="/dashboard/turnos">
        <i class="el-icon-date"></i>
        <span>Administrar turnos</span>
      </el-menu-item>
      <el-menu-item index="/dashboard/">
        <i class="el-icon-user"></i>
        <span>Modificar datos</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name:'Sidebar',
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
        let nombre = this.user.nombre || ''
        if (this.user.apellido)
          nombre += ' ' + this.user.apellido
        return nombre
      }
    }
  }
</script>

<style lang="scss">
  .el-menu {
    height: 100%;
    padding: 3rem 0;
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
