<template>
  <div class="content">
    <el-button
      class="create"
      icon="el-icon-plus"
      type="primary"
      @click="crearPrestacionModel()">Crear Prestación</el-button>

    <el-dialog
      destroy-on-close
      title="Alta de Prestaciones"
      :visible.sync="dialogFormVisible"
      width="450px">
      <div>
        <el-form
          ref="prestacion"
          class="create-prestaciones"
          :inline="true"
          label-width="100px"
          :model="prestacion"
          :rules="rules"
          status-icon>
          <el-form-item
            label="Nombre"
            prop="nombre">
            <el-input
              v-model="prestacion.nombre"
              autocomplete="off"
              class="dialog"
              placeholder=""></el-input>
          </el-form-item>
          <el-form-item
            label="Descripción"
            prop="descripcion">
            <el-input
              v-model="prestacion.descripcion"
              autocomplete="off"
              class="dialog"
              placeholder=""></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          v-if="isNew"
          type="primary"
          @click="submitForm('prestacion')">Crear</el-button>
        <el-button
          v-else
          type="primary"
          @click="submitForm('prestacion')">Modificar</el-button>
      </span>
    </el-dialog>

    <!-- Tabla -->
    <div class="finder">
      <h4>Listado de Prestaciones</h4>
      <div class="block-finder">
        <a>Buscar:</a>
        <el-input
          v-model="input"
          class="inputFinder"
          placeholder="Filtre por nombre"></el-input>
      </div>
    </div>
    <el-table
      :data="pagedPrestaciones"
      style="width: 100%">
      <el-table-column
        label="Nombre"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-circle-plus-outline mr-2"></i>
          <span>{{ scope.row.nombre }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Descripción"
        width="290">
        <template slot-scope="scope">
          <span>{{ scope.row.descripcion }}</span>
        </template>
      </el-table-column>
      <el-table-column width="135">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            content="Borrar"
            effect="light"
            placement="top">
            <el-button
              plain
              size="mini"
              type="danger"
              @click="deletePrestacion(scope.$index, scope.row)"><i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            content="Modificar"
            effect="light"
            placement="top">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="mofidyPrestacion(scope.$index, scope.row)"><i class="el-icon-edit"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="setPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validateNombre = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('El nombre es requerido'));
        } else {
          callback();
        }
      };
      var validateDescripcion = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('La descripción es requerida'));
        } else {
          callback();
        }
      };
      return {
        //pagina
        filtered: [],
        search: '',
        page: 1,
        pageSize: 6,
        total: 0,

        input:'',
        dialogFormVisible: false,
        isNew: true,
        prestacion: {
          nombre:'',
          descripcion:''
        },
        rules: {
          nombre: [
            { validator: validateNombre, trigger: 'blur' }
          ],
          descripcion: [
            { validator: validateDescripcion, trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.$store.dispatch('fetchPrestaciones')
    },
    computed: {
      // PRESTACIONES
      getPrestaciones() {
        return this.$store.getters.getPrestaciones
      },
      searchingPrestaciones() {
        if (!this.input) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.total = this.getPrestaciones.length;
          return this.getPrestaciones;
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.page = 1;
        return this.getPrestaciones.filter(data => data.nombre.toLowerCase().includes(this.input.toLowerCase()));
      },
      pagedPrestaciones() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.total = this.searchingPrestaciones.length;
        return this.searchingPrestaciones.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
      },
    },
    methods: {
      setPage (val) {
        this.page = val
      },
      resetVar() {
        this.isNew=true,
        this.prestacion.nombre = '',
        this.prestacion.descripcion = ''
      },
      crearPrestacionModel() {
        this.resetVar(),
        this.dialogFormVisible = true
      },
      mofidyPrestacion(index, row) {
        this.isNew = false,
        this.prestacion.id = row.id,
        this.prestacion.nombre = row.nombre,
        this.prestacion.descripcion = row.descripcion,
        this.dialogFormVisible = true
      },
      deletePrestacion(index, row) {
        this.$confirm('¿Esta seguro de querer eliminar esta prestación llamada ' + row.nombre + '?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('quitarPrestacion', row.id)
        }).catch(() => {
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isNew){
              this.$store.dispatch('crearPrestacion', this.prestacion)
            } else {
              this.$store.dispatch('modificarPrestacion', this.prestacion)
              this.isNew = true;
            }
            this.dialogFormVisible = false
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss">

  .create-prestaciones {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

  }
  .el-dialog {
    padding:20px;
    max-width: 400px;
  }
  .el-input.dialog {
    padding-right: 20px;
    margin:0px !important;
  }
  .no-borde {
    margin-bottom:0px !important;
  }
  .el-form-item__label {
    margin-bottom:0px !important;
  }
  .el-form-item {
    width:100%;
    padding-bottom:0px !important;
  }
  .el-table .cell {
    word-break: normal !important;
  }
</style>
