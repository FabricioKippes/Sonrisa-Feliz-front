<template>
  <div class="form-consulta">
    <h4 class="adm-tittle">Solicitar turno</h4>
    <el-form
      ref="turnosForm"
      class="solicitar-turno"
      :model="data"
      :rules="reglas">
      <el-form-item
        label="Descripción del problema"
        prop="descripcion">
        <el-input
          v-model="data.descripcion"
          :rows="4"
          type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item
        label="Preferencia de turno"
        prop="turno">
        <el-date-picker
          v-model="fecha"
          format="dd/MM/yyyy"
          :picker-options="pickerOptions"
          placeholder="Elije un Fecha"
          type="date"
          value-format="yyyy-MM-dd"
          value-key="id">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="data.turno"
          :disabled="!fecha"
          icon="time"
          no-match-text= "Horario no disponible"
          placeholder="Seleccione un horario"
          value-key="id">
          <el-option
            v-for="turno in horarios"
            :key="turno.id"
            :label="turno.horario"
            :value="turno">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Fotografías bucales"
        prop="images">
        <el-upload
          ref="upload"
          accept="image/*"
          action="#"
          :auto-upload="false"
          drag
          multiple
          :on-change="handleChange"
          :on-remove="handleRemove"
          width="100%">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Arrastra las fotos aquí <em>o haz click</em></div>
        </el-upload>
      </el-form-item>
      <el-row class="mt-5">
        <el-button
          :loading="busy"
          type="primary"
          @click="submitForm()">
          Enviar
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  export default {
    data () {
      var vm = this

      return {
        busy:false,
        files: [],
        fecha: null,
        data: {
          descripcion: '',
          images: [],
          turno: undefined
        },
        pickerOptions: {
          disabledDate(time) {
            time = moment(time).utc().format('YYYY-MM-DD')
            return vm.fechas.indexOf(time) == -1
          }
        },
        reglas: {
          descripcion: [
            {
              required: true,
              message: 'La descripcion es requerida',
              trigger: 'submit'
            }
          ],
          turno: [
            {
              required: true,
              message: 'Debe seleccionar un turno de preferencia',
              trigger: 'submit'
            }
          ],
          images: [
            {
              required: true,
              message: 'Debe enviar al menos una imagen',
              trigger: 'submit'
            }
          ],
        }
      }
    },

    created() {
      this.$store.dispatch('fetchTurnosDisponibles')
    },

    computed: {
      turnos() {
        return this.$store.getters.getTurnosDisponibles || {}
      },

      fechas() {
        return Object.keys(this.turnos)
      },

      horarios(){
        return this.turnos[this.fecha]
      }
    },

    methods: {
      setFecha: function(selected) {
        this.fecha = selected
      },

      setTurno: function(selected) {
        this.data.turno = selected
      },

      handleRemove(file, fileList) {
        this.files = fileList
      },

      handleChange(file, fileList) {
        this.files = fileList.slice(-3)
      },

      submitForm() {
        this.getImages()
          .then(images => {
            this.data.images = images
            this.$refs.turnosForm.validate((valid) => {
              if (valid) {
                this.busy = true
                this.$store
                  .dispatch('solicitarTurno', this.data)
                  .then(() => {
                    this.resetForm()
                  })
                  .catch(error => {
                    this.$toastErrors(error)
                  })
                  .finally(() => {
                    this.busy = false
                  })
              } else {
                return false
              }
            })
          })
      },

      getImages () {
        const promises = []

        this.files.forEach(element => {
          promises.push(this.createImage(element))
        })

        return Promise.all(promises).then(values => {
          return values.filter(v => v) ?? []
        })
      },

      createImage (file) {
        return new Promise(resolve => {
          const reader = new FileReader()
          let image = new Image()

          reader.onload = (e) => {
            image = e.target.result

            let image = reader.result.toString().replace(/^data:(.*,)?/, '')

            if ((image.length % 4) > 0) {
              image += '='.repeat(4 - (image.length % 4))
            }

            resolve({ image, filename: file.name })
          }

          reader.onerror = (e) => {
            resolve(null)
          }

          reader.readAsDataURL(file.raw)
        })
      },

      resetForm() {
        this.$refs['turnosForm'].resetFields()
        this.fecha = null
        this.$refs['upload'].clearFiles()
      }
    }
  }
</script>

<style lang="scss">
.form-consulta {
  width:95%;
}
.solicitar-turno {
      max-width:400px;
  .el-upload, .el-upload-dragger {
    width: 100%;
  }

  .el-form-item__error {
    margin-top: 5px;
  }
}
</style>
