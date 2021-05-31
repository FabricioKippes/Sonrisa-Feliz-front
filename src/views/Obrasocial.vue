<template>
  <div class="content">
    <el-button
      class="create"
      icon="el-icon-plus"
      type="primary"
      @click="crearObraSocialModel()">Crear Obra Social</el-button>
    <el-dialog
      destroy-on-close
      title="Alta de Obra Social"
      :visible.sync="dialogFormVisible">
      <div>
        <el-form
          ref="os"
          class="create-os"
          :inline="true"
          label-width="100px"
          :model="os"
          :rules="rules"
          status-icon>
          <el-form-item
            label="Nombre"
            prop="nombre">
            <el-input
              v-model="os.nombre"
              autocomplete="off"
              placeholder=""></el-input>
          </el-form-item>
          <el-form-item
            label="Teléfono"
            prop="telefono">
            <el-input
              v-model="os.telefono"
              autocomplete="off"
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
          @click="submitForm('os')">Crear</el-button>
        <el-button
          v-else
          type="primary"
          @click="submitForm('os')">Modificar</el-button>
      </span>
    </el-dialog>




    <div class="finder">
      <div>
        <h4>Listado de Obras Sociales</h4>
      </div>

      <div class="block-finder">
        <a>Buscar:</a>
        <el-input
          v-model="input"
          class="inputFinder"
          placeholder="Filtre por nombre"></el-input>
      </div>
    </div>
    <el-table
      :data="pagedOSocial"
      style="width: 100%">
      <el-table-column
        label="Nombre"
        width="250">
        <template slot-scope="scope">
          <i class="el-icon-circle-plus-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.nombre }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Telefono"
        width="150">>
        <template slot-scope="scope">
          <i class="el-icon-phone-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.telefono }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="135">
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
              @click="deleteOs(scope.$index, scope.row)"><i class="el-icon-delete"></i>
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
              @click="mofidyOs(scope.$index, scope.row)"><i class="el-icon-edit"></i>
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
      var validateTelefono = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('El telefono es requerido'));
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
        os: {
          nombre:'',
          telefono:''
        },
        rules: {
          nombre: [
            { validator: validateNombre, trigger: 'blur' }
          ],
          telefono: [
            { validator: validateTelefono, trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.$store.dispatch('fetchObrasSociales')
    },
    computed: {
      // PRESTACIONES
      getOSocial() {
        return this.$store.getters.getObrasSociales
      },
      searchingOSocial() {
        if (!this.input) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.total = this.getOSocial.length;
          return this.getOSocial;
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.page = 1;
        return this.getOSocial.filter(data => data.nombre.toLowerCase().includes(this.input.toLowerCase()));
      },
      pagedOSocial() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.total = this.searchingOSocial.length;
        return this.searchingOSocial.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
      },
    },
    methods: {
      setPage (val) {
        this.page = val
      },
      resetVar() {
        this.isNew=true,
        this.os.nombre = '',
        this.os.telefono = ''
      },
      crearObraSocialModel() {
        this.resetVar(),
        this.dialogFormVisible = true
      },
      mofidyOs(index, row) {
        this.isNew = false,
        this.os.id = row.id,
        this.os.nombre = row.nombre,
        this.os.telefono = row.telefono,
        this.dialogFormVisible = true
      },
      deleteOs(index, row) {
        this.$confirm('¿Esta seguro de querer eliminar esta Obra Social ' + row.nombre + '?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('quitarObraSocial', row.id)
        }).catch(() => {
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isNew){
              this.$store.dispatch('crearObraSocial', this.os)
            } else {
              this.$store.dispatch('modificarObraSocial', this.os)
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
    @media (min-width: 1100px) {
    .el-table__body, .el-table__header {
        width: 100% !important;
        table-layout:auto !important;
      }
    }
    .el-table__body, .el-table__header {
      margin: auto !important;
    }
    .content {
      width: 80%;
      min-height: 700px;
      margin-left: auto;
      margin-right: auto;;
      padding-bottom: 50px;
    }
    .block-finder {
      display:flex;
      align-items: center;
    }
    .finder {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom:40px;
    align-items: center;
    }
.el-input.inputFinder {
  width:200px !important;
  margin:10px !important;
  border:1px solid $principal;
  border-radius: 6px;
}
.el-button.create {
  margin:40px 0px ;
}
.el-form-item__label {
  text-align: left !important;
}
</style>
