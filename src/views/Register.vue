<template>
  <form-wizard
    color="#20a0ff"
    error-color="#ff4949"
    shape="circle">
    <h2 slot="title">Formulario de Registro</h2>
    <tab-content
      :before-change="validateFirstStep"
      icon="ti-user"
      title="Datos de usuario">
      <el-form
        ref="userForm"
        :model="user"
        :rules="rules_user">
        <el-form-item
          label="Usuario"
          prop="usuario">
          <el-input
            v-model="user.usuario"
            placeholder=""></el-input>
        </el-form-item>
        <el-form-item
          label="Email"
          prop="email">
          <el-input
            v-model="user.email"
            placeholder=""></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password">
          <el-input
            v-model="user.password"
            placeholder=""
            type="password"></el-input>
        </el-form-item>
      </el-form>

    </tab-content>
    <tab-content
      :before-change="validateSecondStep"
      icon="ti-settings"
      title="Informacion del paciente">
      <el-form
        ref="pacienteForm"
        :model="user"
        :rules="rules_paciente">
        <el-form-item
          label="Nombre"
          prop="nombre">
          <el-input
            v-model="user.nombre"
            placeholder=""></el-input>
        </el-form-item>
        <el-form-item
          label="Apellido"
          prop="apellido">
          <el-input
            v-model="user.apellido"
            placeholder=""></el-input>
        </el-form-item>
        <el-form-item
          label="DNI"
          prop="dni">
          <el-input
            v-model="user.dni"
            placeholder=""></el-input>
        </el-form-item>
        <el-form-item
          label="Obra Social"
          prop="obra_social_id">
          <el-select
            v-model="user.obra_social_id"
            no-match-text = "No data found"
            placeholder="Lista de obra Sociales"
            value=""
            @input= "cambioObraSocial">
            <el-option
              v-for="os in obras_sociales"
              :key="os.id"
              :label="os.nombre"
              :value="os.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Fecha de Nacimiento   "
          prop="fecha_nacimiento">
          <el-date-picker
            v-model="user.fecha_nacimiento"
            format="dd/MM/yyyy"
            placeholder="Elije un Fecha"
            type="date"
            value=""
            value-format="yyyy/MM/dd"
            @change="cambioFecha">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="Telefono"
          prop="telefono">
          <el-input
            v-model="user.telefono"
            placeholder=""></el-input>
        </el-form-item>

      </el-form>
    </tab-content>
    <tab-content
      icon="ti-check"
      title="Paso Final">
      <p class="text-final">
        Ya falta muy poco {{user.apellido + " " + user.nombre}},
        pronto estarás disfrutando de nuestros servicios.
        Gracias por la paciencia.</p>
    </tab-content>

    <el-button
      slot="prev"
      type="warning">Back</el-button>
    <el-button
      slot="next"
      type="warning">Next</el-button>
    <el-button
      slot="finish"
      type="warning"
      @click="send">Finish</el-button>
  </form-wizard>

</template>

<script>
  export default {
    data() {
      return {
        user: {
          usuario: '',
          email: '',
          password:'',
          nombre:'',
          apellido:'',
          dni:'',
          obra_social_id:'',
          fecha_nacimiento:'',
          telefono:''
        },
        rules_paciente:{
          nombre: [
            {
              required: true,
              message: 'El nombre del paciente es requerido',
              trigger: 'blur'
            }
          ],
          apellido: [
            {
              required: true,
              message: 'El apellido del paciente es requerido',
              trigger: 'blur'
            }
          ],
          dni: [
            {
              required: true,
              message: 'El dni del paciente es requerido',
              trigger: 'blur'
            },
            {
              pattern:/^([0-9])*$/,
              message: 'Solo se deben ingresar números'
            },
            {
              min: 7,
              max: 9,
              message:'Solo se permiten entre 7 y  9 digitos'
            },
          ],
          obra_social_id: [
            {
              required: true,
              message: 'Una obra social es requerida',
              trigger: 'blur'
            }
          ],
          fecha_nacimiento: [
            {
              required: true,
              message: 'Es requerido una fecha de nacimiento',
              trigger: 'blur'
            }
          ],
          telefono: [
            {
              required: true,
              message: 'Es requerido un número de contacto',
              trigger: 'blur'
            }
          ],
        },
        rules_user: {
          usuario: [
            {
              required: true,
              message: 'El nombre de usuario es requerido',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: 'El correo es requerido',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Formato de Email Inválido',
              trigger: 'change'
            }
          ],
          password: [
            {
              required: true,
              message: 'La password es requerida',
              trigger: 'blur'
            },
            {
              pattern:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/,
              message: 'Debe tener al menos una mayuscula, una minúscula y un número',
            },
            {
              min: 8,
              message: 'Tamaño minimo 8 caracteres',
              trigger: 'change'
            }
          ],
        }
      }},

    created () {
      this.$store.dispatch('fetchObrasSociales')
    },

    computed: {
      obras_sociales() {
        return this.$store.getters.getObrasSociales
      }
    },

    methods: {
      send() {
        this.$store.dispatch('register', this.user)
      },

      cambioFecha: function(selected) {
        this.fecha_nacimiento = selected
      },

      cambioObraSocial: function(selected) {
        this.obra_social_id = selected
      },

      validateFirstStep() {
        return new Promise((resolve, reject) => {
          this.$refs.userForm.validate((valid) => {
            resolve(valid);
          });
        })
      },

      validateSecondStep() {
        return new Promise((resolve, reject) => {
          this.$refs.pacienteForm.validate((valid) => {
            resolve(valid);
          });
        })
      }
    }
  }
</script>
<style lang="scss">
    @media (max-width: 500px) {
      .wizard-card-footer {
        width:100% !important;
      }
      .text-final {
        width:100% !important;
      }
    }
.text-final {
  width: 500px;
  margin-right: auto;
  margin-left: auto;
  text-align:center;
  height: 100px;
  vertical-align: middle !important;
}
.wizard-card-footer {
  width: 500px;
  margin-right: auto;
  margin-left: auto;
}
.form-wizard {
  width:100%;
  display:flex;
  justify-content:center;
}
.wizard-header {
  margin-top: 40px;
}

.el-form {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.el-input input{
  width: 100%;
  border:none;
  /* border-bottom: 1px solid black; */
}
.el-form-item {
    border-bottom: 1px solid black;
}
.el-select {
  width:100%;
  border: 0px !important;
}
.el-date-editor {
  width:100% !important;
}
</style>
