<template>
  <div class="content">
    <!-- dialog modal -->
    <el-dialog
      class="dialogs"
      close="resetVar()"
      destroy-on-close
      opened="isNew"
      title="Asignar Turno a Paciente"
      :visible.sync="dialogFormVisible">
      <div>
        <el-form
          ref="turno"
          class="asiganar-turnos"
          :inline="true"
          label-width="100px"
          :model="turno"
          status-icon>
          <p>Fecha:  {{ format(turno.fecha) }}</p>
          <p>Horario:  {{ turno.horario}}</p>
          <p v-if="!getHide">Paciente: {{turno.paciente_dni}}</p>
          <el-form-item
            v-if="getHide"
            label="Paciente: ">
            <el-select
              v-model="turno.paciente_dni"
              filterable
              placeholder="Seleccionar Paciente">
              <el-option
                v-for="item in pacientes"
                :key="item.dni"
                :label="item.nombre"
                :value="item.dni">
                <span style="float: left">{{ item.dni }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nombre }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Prestación"
            prop="descripcion">
            <el-select
              v-model="turno.prestacion_id"
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
            v-if="!getHide"
            class="sin-borde ">
            <div class="block-pago">
              <span>Precio:</span>
              <el-input
                v-model="turno.precio"
                class="monto"
                placeholder="Monto a Pagar"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="submitForm('turno')">Asignar</el-button>
      </span>
    </el-dialog>
    <!-- fin del dialog modal -->
    <!-- tab -->
    <el-tabs
      v-model="activeName"
      class="tab"
      @tab-click="controlTab">
      <el-tab-pane
        class="primerTab"
        label="Disponibles"
        name="first">
        <!-- primer tab (turno disponible) -->
        <div class="contenido">
          <div class="finder">
            <h4 class="tittle">Listado de Turnos Disponibles</h4>
            <div>
              <a>Buscar:</a>
              <el-date-picker
                v-model="fecha"
                class="picker"
                format="dd/MM/yyyy"
                placeholder="Elije un Fecha"
                type="date"
                value-format="yyyy-MM-dd"
                @change="cambioFecha">
              </el-date-picker>
            </div>
          </div>
          <el-table
            :data="pagedTableTurnosDisponibles"
            :default-sort = "{prop: 'fecha', order: 'descending'}"
            style="width: 100%">
            <el-table-column
              label="Fecha"
              prop="fecha"
              sortable
              width="130">
              <template slot-scope="scope">
                <i class="el-icon-date"></i>
                <span style="margin-left: 10px">{{ format(scope.row.fecha) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Horario"
              width="120">
              <template slot-scope="scope">
                <i class="el-icon-watch"></i>
                <span style="margin-left: 10px">{{ scope.row.horario }}</span>
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
                    @click="deleteTurno(scope.$index, scope.row)"><i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Asignar Paciente"
                  effect="light"
                  placement="top">
                  <el-button
                    plain
                    size="mini"
                    type="primary"
                    @click="asignarTurno(scope.$index, scope.row, true)"><i class="el-icon-user"></i>
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
      </el-tab-pane>
      <!-- fin del primer tab -->
      <el-tab-pane
        label="Ocupados"
        name="second">
        <!-- segundo tab (turno ocupado) -->
        <div class="contenido">
          <div class="finder">
            <h4>Listado de Turnos Asignados</h4>
            <div>
              <a>Buscar:</a>
              <el-date-picker
                v-model="fecha"
                class="picker"
                format="dd/MM/yyyy"
                placeholder="Elije un Fecha"
                type="date"
                value-format="yyyy-MM-dd"
                @change="cambioFecha">
              </el-date-picker>
            </div>
          </div>
          <el-table
            :data="pagedTableTurnosAsignados"
            :default-sort = "{prop: 'fecha', order: 'descending'}"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <h4 class="tittle">Información Adicional</h4>
                <p>DNI Paciente: {{ props.row.paciente.dni }}</p>
                <p>Edad: {{ props.row.paciente.edad }}</p>
                <p>Teléfono: {{ props.row.paciente.telefono }}</p>
                <p>Obra Social: {{ props.row.paciente.obra_social.nombre || ''}} </p>
              </template>
            </el-table-column>
            <el-table-column
              label="Fecha"
              prop="fecha"
              sortable
              width="130">
              <template slot-scope="scope">
                <i class="el-icon-date"></i>
                <span>{{ format(scope.row.fecha) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Horario"
              width="90">
              <template slot-scope="scope">
                <i class="el-icon-watch"></i>
                <span style="margin-left: 10px">{{ scope.row.horario }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Paciente"
              width="180">
              <template slot-scope="scope">
                <i class="el-icon-user"></i>
                <span style="margin-left: 10px">{{ scope.row.paciente.apellido+ ' ' +scope.row.paciente.nombre }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Prestación"
              width="170">
              <template slot-scope="scope">
                <i class="el-icon-circle-plus-outline"></i>
                <span style="margin-left: 10px">{{ scope.row.prestacion ? scope.row.prestacion.nombre:'-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Estado"
              width="130">
              <template slot-scope="scope">
                <i class="el-icon-circle-plus-outline"></i>
                <span style="margin-left: 10px">{{ scope.row.estado }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Precio"
              width="100">
              <template slot-scope="scope">
                <i class="el-icon-circle-plus-outline"></i>
                <span style="margin-left: 10px">{{ scope.row.precio ? scope.row.precio:'-' }}</span>
              </template>
            </el-table-column>
            <el-table-column width="200">
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
                    @click="deleteTurno(scope.$index, scope.row)"><i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Liberar"
                  effect="light"
                  placement="top">
                  <el-button
                    plain
                    size="mini"
                    type="warning"
                    @click="liberarTurno(scope.$index, scope.row)"><font-awesome-icon :icon="['fa', 'user-times']" />
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Asignar Prestación"
                  effect="light"
                  placement="top">
                  <el-button
                    plain
                    size="mini"
                    type="primary"
                    @click="asignarTurno(scope.$index, scope.row, false)"><font-awesome-icon :icon="['fa', 'hand-holding-medical']" />
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: center">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSizeA"
              :total="totalA"
              @current-change="setPageA">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!-- fin del segundo tab -->
      <!-- comienzo del tercer tab -->
      <el-tab-pane
        label="Crear Turno"
        name="third">

        <el-form
          ref="createTurno"
          :inline="true"
          label-width="100px"
          :model="turno"
          :rules="rules"
          status-icon>
          <div class="crearFecha">
            <el-form-item
              label="Fecha"
              prop="fecha">
              <el-date-picker
                v-model="turno.fecha"
                class="picker"
                format="dd/MM/yyyy"
                placeholder="Elije un Fecha"
                type="date"
                value-format="yyyy-MM-dd"
                @change="cambioFecha">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="Horario"
              prop="horario">
              <el-time-select
                v-model="turno.horario"
                arrow-control
                class="picker"
                :picker-options="{
                  start: '07:00',
                  step: '01:00',
                  end: '23:00'
                }"
                placeholder="Elija Horario">
              </el-time-select>
            </el-form-item>
            <span
              slot="footer"
              class="dialog-footer">
              <el-button @click="resetVar()">Cancel</el-button>
              <el-button
                type="primary"
                @click="submitForm('createTurno')">Crear</el-button>
            </span>
          </div>

        </el-form>


      </el-tab-pane>
    <!-- <el-tab-pane
        label="Task"
        name="fourth">Task</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      var validateFecha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('La Fecha es requerida'));
        } else {
          callback();
        }
      };
      var validateHorario = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('El Horario es requerido'));
        } else {
          callback();
        }
      };
      return {
        //disponibles pagina
        filtered: [],
        search: '',
        page: 1,
        pageSize: 6,
        total: 0,
        //asignados pagina
        filteredA: [],
        searchA: '',
        pageA: 1,
        pageSizeA: 6,
        totalA: 0,
        nuevo:true,
        prestaciones:[],
        pacientes:[],
        turno: {
          fecha:'',
          horario:'',
          paciente_dni:'',
          prestacion_id:'',
          precio:''
        },
        rules: {
          fecha: [
            { validator: validateFecha, trigger: 'blur' }
          ],
          horario: [
            { validator: validateHorario, trigger: 'blur' }
          ]
        },
        hideSelect: false,
        dialogFormVisible: false,
        fecha:'',
        input:'',
        activeName: 'first',
      };
    },
    created () {
      this.$store.dispatch('fetchTurnos')
      this.$store.dispatch('fetchPacientes')
      this.$store.dispatch('fetchPrestaciones')
    },
    methods: {
      setPage (val) {
        this.page = val
      },
      setPageA (val) {
        this.pageA = val
      },
      controlTab(activeName) {
        this.resetVar()
      },
      submitForm(formName) {
        if(formName == 'createTurno') {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$store.dispatch('crearTurno', this.turno).then(() => {
                this.resetVar()
              })
            } else {
              return false;
            }
          });
        } else{
          this.$store.dispatch('crearTurno', this.turno)
          this.dialogFormVisible = false
        }
      },
      resetVar() {
        this.fecha = '',
        this.turno.id = '',
        this.turno.fecha = '',
        this.turno.horario = '',
        this.turno.paciente_dni = '',
        this.turno.prestacion_id = '',
        this.turno.precio = ''
      },
      asignarTurno(index, row, hideSelect) {
        this.hideSelect = hideSelect
        this.getPacientes(),
        this.getPrestaciones(),
        this.turno.id = row.id
        this.turno.fecha = row.fecha
        this.turno.horario = row.horario
        this.turno.paciente_dni = row.paciente_dni
        this.turno.prestacion_id = row.prestacion_id
        this.turno.precio = row.precio
        this.dialogFormVisible = true
      },
      liberarTurno(index, row) {
        this.$confirm('¿Esta seguro de querer liberar este turno?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.turno.id = row.id,
          this.turno.fecha = row.fecha,
          this.turno.horario = row.horario,
          this.turno.paciente_dni = null,
          this.turno.prestacion_id = null,
          this.turno.precio = null
          this.$store.dispatch('crearTurno', this.turno)
        }).catch(() => {
        })
      },
      deleteTurno(index, row) {
        this.$confirm('¿Esta seguro de querer eliminar este turno: ' + row.fecha + ' ' + row.horario + '?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('quitarTurnoAdmin', row.id)
        }).catch(() => {
        })
      },
      cambioFecha: function(selected) {
        this.fecha = selected
      },
      format(fecha) {
        return moment(fecha).utc().format('DD/MM/YYYY')
      },
      getPacientes() {
        this.pacientes = this.$store.getters.getPacientes
      },
      getPrestaciones() {
        this.prestaciones = this.$store.getters.getPrestaciones
      }
    },
    computed: {
      getHide() {
        //no andaba esta mierda
        return this.hideSelect
      },
      // TURNOS DISPONIBLES
      getTurnosDisponibles() {
        return this.$store.getters.getTurnosDisponiblesAdmin
      },
      searchingTurnosDisponibles() {
        if (!this.fecha) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.total = this.getTurnosDisponibles.length;
          return this.getTurnosDisponibles;
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.page = 1;
        return this.getTurnosDisponibles.filter(data => data.fecha.toLowerCase().includes(this.fecha.toLowerCase()));
      },
      pagedTableTurnosDisponibles() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.total = this.searchingTurnosDisponibles.length;
        return this.searchingTurnosDisponibles.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
      },
      //TURNOS ASIGNADOS
      getTurnosAsignados() {
        return this.$store.getters.getTurnosAsignadosAdmin
      },
      searchingTurnosAsignados() {
        if (!this.fecha) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.totalA = this.getTurnosAsignados.length;
          return this.getTurnosAsignados;
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.pageA = 1;
        return this.getTurnosAsignados.filter(data => data.fecha.toLowerCase().includes(this.fecha.toLowerCase()));
      },
      pagedTableTurnosAsignados() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.totalA = this.searchingTurnosAsignados.length;
        return this.searchingTurnosAsignados.slice(this.pageSizeA * this.pageA - this.pageSizeA, this.pageSizeA * this.pageA);
      },
    },
  }
</script>

<style lang="scss">
    @media (max-width: 500px) {
      .el-dialog {
        width:100vw !important;
      }
      .el-popup-parent--hidden {
        padding-right:0px !important;
      }
      .el-message-box {
        width:100% !important;
      }
    }
    .block-pago {
      display: flex;
      // justify-content: space-between;
      .monto {
        max-width:150px;
      }
    }
    #pane-third {
      display:flex;
      flex-direction: column;
      align-items: center;
      text-align:left !important;
    }
    .el-tabs__header {
      margin-bottom:40px
    }
    .crearFecha {
      margin-top:50px;
      max-width:400px;
      display:flex;
      flex-wrap: wrap
    }
    .dialog-footer {
      width:100%;
      text-align: right;
      margin-top: 20px;
    }
    .picker {
      width:200px !important;
    }
    .tab {
      padding: 20px 0px 20px 20px !important;
    }
    // #tab-first {
    // padding-left: 80px !important;
    // }
    .el-pagination {
      margin: 30px 0px;
    }

</style>
