<template>

  <div class="content tabla-turnos">

    <!-- DIALOG PARA PAGO -->
    <el-dialog
      destroy-on-close
      title="Pago de Practica"
      :visible.sync="dialogFormPago">
      <div>
        <el-form
          ref="pagos"
          :inline="true"
          label-width="100px"
          :model="pago"
          :rules="rules"
          status-icon>
          <el-form-item class="sin-borde">
            <div class="center">
              <span>Podes pagar con debito o credito</span>
              <img
                class="block-image"
                src="@/assets/credit-card.jpg">
            </div>
          </el-form-item>
          <el-form-item
            prop="num_tarjeta">
            <p>Número de tarjeta:</p>
            <el-input
              v-model="pago.nro_tarjeta"
              autocomplete="off"
              maxlength="16"
              placeholder=""></el-input>
          </el-form-item>
          <el-form-item
            prop="cod_seguridad">
            <p>Código de Seguridad:</p>
            <el-input
              v-model="pago.cod_seguridad"
              autocomplete="off"
              maxlength="3"
              placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <p>Fecha Expiración:</p>
            <el-date-picker
              v-model="pago.fecha_expiracion"
              class="picker"
              format="dd/MM/yyyy"
              placeholder="Elije un Fecha"
              type="date"
              value-format="yyyy-MM-dd"
              @change="cambioFecha">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            prop="nombre_titular">
            <p>Nombre del titular:</p>
            <el-input
              v-model="pago.nombre_titular"
              autocomplete="off"
              placeholder=""></el-input>
          </el-form-item>
          <el-form-item
            prop="dni_titular">
            <p>Dni del titular:</p>
            <el-input
              v-model="pago.dni_titular"
              autocomplete="off"
              maxlength="8"
              placeholder=""></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormPago = false">Cancel</el-button>
        <el-button
          :loading="busy"
          type="primary"
          @click="submitForm('pagos')">Pagar</el-button>
      </span>
    </el-dialog>

    <!-- TABLA -->
    <h4>Turnos agendados</h4>
    <el-table
      :data="turnos"
      style="width: 100%">
      <el-table-column
        label="Fecha"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ format(scope.row.fecha) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Horario"
        width="100">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.horario }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Estado"
        width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.estado }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Precio"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ formatCoins(scope.row.precio) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="170">
        <template
          slot-scope="scope">
          <el-button
            v-if="scope.row.estado != 'Pagado'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Borrar</el-button>
          <el-button
            v-if="scope.row.estado === 'Confirmado'"
            size="mini"
            type="success"
            @click="realizarPago(scope.$index, scope.row)">Pagar</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        busy:false,
        dialogFormPago:false,
        pago: {
          paciente_dni:'',
          turno_id:'',
          nro_tarjeta:'',
          cod_seguridad:'',
          fecha_expiracion:'',
          nombre_titular:'',
          dni_titular:''
        },
        rules: {
          nro_tarjeta: [
            {
              required: true,
              message: 'El número de tarjeta es requerido',
              trigger: 'blur'
            },
            {
              pattern:/^([0-9])*$/,
              message: 'Solo se deben ingresar números'
            },
            {
              min: 16,
              message:'Solo se permiten entre 7 y  9 digitos'
            },

          ],
          cod_seguridad: [
            {
              required: true,
              message: 'El código de seguridad es requerido',
              trigger: 'blur'
            },
            {
              pattern:/^([0-9])*$/,
              message: 'Solo se deben ingresar números'
            },
            {
              min: 3,
              message:'Deben ser 3 números'
            },
          ],
          nombre_titular: [
            {
              required: true,
              message: 'El nombre del titular es requerido',
              trigger: 'blur'
            },
            {
              max: 100,
              message:'Máximo 100 dígitos'
            },
          ],
          dni_titular: [
            {
              required: true,
              message: 'El dni del titular es requerido',
              trigger: 'blur'
            },
            {
              min: 7,
              message:'Mínimo 7 dígitos'
            },
          ],
        }
      }
    },
    computed: {
      turnos() {
        return this.$store.getters.getTurnosUsuario
      }
    },

    created() {
      this.$store.dispatch('fetchTurnosUsuario')
    },

    methods: {
      cambioFecha: function(selected) {
        this.fecha = selected
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.busy = true
            this.$store.dispatch('abonoPractica', this.pago)
              .then(()=> {
                this.dialogFormPago = false
              })
              .catch((error) => {
                this.$toastErrors(error)
              })
              .finally(() => {
                this.busy = false
              })

          }
        });
      },
      handleDelete(index, row) {
        this.$confirm('¿Esta seguro de querer borrar este turno?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('quitarTurno', row.id)
        }).catch(() => {
        })
      },
      realizarPago(index,row) {
        this.pago.paciente_dni = row.paciente_dni
        this.pago.turno_id = row.id
        this.dialogFormPago = true;
      },
      format(fecha) {
        return moment(fecha).utc().format('DD/MM/YYYY')
      },
      formatCoins(precio) {
        if(precio == null) return '-'
        else return '$ '+ precio
      }
    }
  }
</script>

<style lang="scss">
    .el-dialog {
      .block-image {
        width:100%;
        border-bottom: 0px !important;
        margin-bottom:30px;
      }
      .p {
        margin:0px !important;
      }
    }
</style>
