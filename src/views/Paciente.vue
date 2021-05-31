<template>
  <div class="content">
    <!-- DIALOG PARA VER LISTAR HISTORIAS CLINICAS -->
    <el-dialog
      destroy-on-close
      title="Historia Clínica del paciente"
      :visible.sync="dialogFormVisible">
      <div>
        <el-table :data="getHClinicas">
          <el-table-column
            label="Fecha"
            width="200px">
            <template slot-scope="scope">
              <i class="el-icon-circle-plus-outline"></i>
              <span style="margin-left: 10px">{{ scope.row.fecha }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Observación"
            property="observaciones"
            width="200">
          </el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Volver</el-button>
      </span>
    </el-dialog>
    <!-- DIALOG PARA INGRESAR UNA NUEVA HISTORIA CLINICA -->
    <el-dialog
      class="dialogs"
      destroy-on-close
      title="Guardar Historia Clínica"
      :visible.sync="dialogFormHC">
      <div>
        <el-form
          ref="historia-clinica"
          :inline="true"
          label-width="100px"
          :model="historia_clinica"
          status-icon>
          <el-form-item class="sin-borde">
            <h5>Paciente:</h5>
            <p class="no-borde">DNI: {{historia_clinica.paciente_dni}}</p>
            <p class="no-borde">Nombre: {{historia_clinica.paciente_nombre}}</p>
          </el-form-item>
          <el-form-item
            label="Prestación"
            prop="descripcion">
            <el-select
              v-model="historia_clinica.prestacion_id"
              filterable
              placeholder="Seleccionar Prestación">
              <el-option
                v-for="item in prestaciones"
                :key="item.nombre"
                :label="item.nombre"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="sin-borde"
            prop="observaciones">
            <p>Observaciones:</p>
            <el-input
              v-model="historia_clinica.observaciones"
              class=""
              :rows="4"
              size="medium"
              type="textarea">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormHC = false">Cancelar</el-button>
        <el-button
          :loading="cargando"
          type="primary"
          @click="submitForm('historia-clinica')">Cargar</el-button>
      </span>
    </el-dialog>

    <div class="finder finder-paciente">
      <h4>Listado de Pacientes</h4>
      <div class="block-finder">
        <a>Buscar:</a>
        <el-input
          v-model="input"
          class="inputFinder"
          placeholder="Nombre o Apellido"></el-input>
      </div>
    </div>
    <el-table
      :data="pagedPacientes"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <h4 class="tittle">Información Adicional</h4>
          <p>Fecha Nacimiento: {{ format(props.row.fecha_nacimiento) }}</p>
          <p>Edad: {{ props.row.edad }}</p>
          <p>Telefono: {{ props.row.telefono }}</p>
          <p>Obra Social: {{ props.row.obra_social.nombre }} </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Apellido y Nombre"
        width="200">
        <template slot-scope="scope">
          <i class="el-icon-circle-plus-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.apellido +' '+ scope.row.nombre }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Dni"
        prop="dni"
        width="130">
        <template slot-scope="scope">
          <i class="el-icon-circle-plus-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.dni }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            content="Ver Historia Clínica"
            effect="light"
            placement="top">
            <el-button
              :loading="index===scope.$index"
              plain
              size="mini"
              type="primary"
              @click="cargarHClinica(scope.$index, scope.row)">
              <i
                v-if="index != scope.$index"
                class="el-icon-view"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip
            v-if="$store.state.isWeb"
            class="item"
            content="Descargar Historia Clínica"
            effect="light"
            placement="top">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="downloadHistoriaPaciente(scope.$index, scope.row)"><i class="el-icon-download"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            content="Cargar Historia Clínica"
            effect="light"
            placement="top">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="crearHClinica(scope.$index, scope.row)"><i class="el-icon-document-add"></i>
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
  import moment from 'moment'
  export default {
    data() {
      return {
        index:-1,
        input:'',
        prestaciones:[],
        historia_clinica: {
          observaciones:'',
          paciente_dni:'',
          prestacion_id:'',
          paciente_nombre:''
        },
        pacientes: {
          id:'',
          nombre:'',
          apellido:'',
          fecha_nacimiento:'',
          obra_social_id:'',
          telefono:''
        },
        //pagina
        filtered: [],
        search: '',
        page: 1,
        pageSize: 6,
        total: 0,

        dialogFormVisible: false,
        dialogFormHC: false,
        cargando: false
      }
    },
    computed: {
      //HISTORIAS CLINICAS
      getHClinicas(){
        return this.$store.getters.getHistoriasPaciente
      },
      // PACIENTES
      getPacientes() {
        return this.$store.getters.getPacientes
      },
      searchingPacientes() {
        if (!this.input) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.total = this.getPacientes.length;
          return this.getPacientes;
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.page = 1;
        return this.getPacientes.filter(data =>
          data.nombre.toLowerCase().includes(this.input.toLowerCase()) ||
          data.apellido.toLowerCase().includes(this.input.toLowerCase())
        );
      },
      pagedPacientes() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.total = this.searchingPacientes.length;
        return this.searchingPacientes.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
      },
    },
    created () {
      this.$store.dispatch('fetchPacientes')
      this.$store.dispatch('fetchPrestaciones')
    },
    methods: {
      submitForm(formName) {
        if(formName == 'historia-clinica') {
          this.cargando = true
          this.$store.dispatch('crearHistoriaClinica', this.historia_clinica)
            .then(() => {
              this.dialogFormHC = false;
            })
            .finally(() => {
              this.cargando = false
            })
        }
      },
      getPrestaciones() {
        this.prestaciones = this.$store.getters.getPrestaciones
      },
      format(fecha) {
        return moment(fecha).utc().format('DD/MM/YYYY')
      },
      setPage (val) {
        this.page = val
      },
      downloadHistoriaPaciente(index,row) {
        this.$store.dispatch('downloadHistoriaPaciente', row.dni)
      },
      deletePaciente(index, row) {
        this.$confirm('¿Está seguro de querer eliminar al paciente: ' + row.apellido + ' ' + row.nombre + '?', 'Atención', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('quitarTurnoAdmin', row.id)
        }).catch(() => {
        })
      },
      cargarHClinica(index, row) {
        this.index = index
        this.$store.dispatch('fetchHistoriaPaciente', row.dni)
          .then(()=> {
            this.dialogFormVisible = true;
          })
          .catch((error) => {
            this.$toastErrors(error)
          })
          .finally(() => {
            this.index = -1
          })
      },
      crearHClinica(index,row) {
        this.getPrestaciones()
        this.historia_clinica.paciente_dni = row.dni;
        this.historia_clinica.paciente_nombre = row.nombre + ' ' + row.apellido
        this.dialogFormHC = true;
      }
    }
  }
</script>

<style lang="scss">
  .el-form-item__content {
    width:100% !important;
  }
  .sin-borde {
    border-bottom: 0px;
  }
  .tittle {
    margin-bottom:20px;
  }
  .finder-paciente {
    margin-top:40px;
  }
</style>
