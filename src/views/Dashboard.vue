<template>
  <el-container>
    <sidebarAdmin v-if="isAdmin" />
    <sidebar v-else />
    <router-view />
  </el-container>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import SidebarAdmin from '@/components/SidebarAdmin'
  import { mapGetters } from 'vuex'
  export default {
    components: { Sidebar,SidebarAdmin },
    computed: {
      ...mapGetters([
        'isAdmin',
        'getUser',
      ])
    }
  }
</script>

<style lang="scss">

</style>
