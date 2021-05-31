<template>
  <div class="content">
    <el-tabs
      v-model="activeName"
      class="tab">
      <el-tab-pane
        class="primerTab"
        label="Solicitar Turno"
        name="first">
        <form-consulta />
      </el-tab-pane>
      <el-tab-pane
        label="Mis Turnos"
        name="second">
        <lista-turnos />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import FormConsulta from '@/components/FormConsulta'
  import ListaTurnos from '@/components/ListaTurnos'

  export default {
    data() {
      return {
        activeName: 'first'
      }
    },
    components: { FormConsulta, ListaTurnos }
  }
</script>

<style lang="scss">
  .el-form-item {
    margin-bottom: 30px;

    .el-form-item__error {
      padding: 4px 15px 0;
    }
  }
</style>
