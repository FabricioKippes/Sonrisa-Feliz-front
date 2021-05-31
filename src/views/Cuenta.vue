<template>
  <div class="content">
    <h1 class="adm-tittle">Administrar Datos</h1>
    <el-form
      ref="userForm"
      :model="user"
      :rules="rules_user">
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
      <el-form-item
        label="Repetir password"
        prop="password">
        <el-input
          v-model="user.confirm_password"
          placeholder=""
          type="password"></el-input>
      </el-form-item>
      <el-form-item
        v-if="!isAdmin"
        label="Obra Social">
        <el-select
          v-model="user.obra_social_id"
          filterable
          no-match-text = "No se encontraron resultados"
          placeholder="Seleccionar obra social">
          <el-option
            v-for="os in obras_sociales"
            :key="os.id"
            :label="os.nombre"
            :value="os.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="!isAdmin"
        label="Telefono"
        prop="telefono">
        <el-input
          v-model="user.telefono"
          placeholder=""></el-input>
      </el-form-item>
      <el-row class="mt-5 dialog-footer">
        <el-button @click="resetForm()">
          Cancelar
        </el-button>
        <el-button
          :loading="busy"
          type="primary"
          @click="submitForm()">
          Guardar
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        busy: false,
        user: {
          email: '',
          password:'',
          confirm_password:'',
          obra_social_id: '',
          telefono: ''
        },
        rules_user: {
          email: [
            {
              type: 'email',
              message: 'Formato de Email Inválido',
              trigger: 'change'
            }
          ],
          password: [
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
      this.resetForm()
    },

    computed: {
      ...mapGetters([
        'isAdmin',
        'getUser',
      ]),
      obras_sociales() {
        return this.$store.getters.getObrasSociales
      },

      current() {
        return this.$store.getters.getUser
      },

      email() {
        return this.current.email ?? ''
      },

      telefono() {
        if(!this.isAdmin) return this.current.paciente.telefono ?? ''
        else return ''
      },

      obra_social_id() {
        if(!this.isAdmin)  return this.current.paciente.obra_social_id ?? ''
        else return ''
      },
    },

    methods: {
      cambioObraSocial: function(selected) {
        this.user.obra_social_id = selected
      },

      submitForm() {
        if (this.user.password && this.user.password != this.user.confirm_password) {
          this.$toastErrors('Las contraseñas no coinciden')
          return false;
        }

        let payload = { ...this.user }

        if (payload.password === '') {
          delete payload.password
        }

        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            this.busy = true
            this.$store.dispatch('updateUser', payload)
              .finally(() => {
                this.busy = false
              })
          } else {
            this.$toastErrors('Algunos campos tienen errores, por favor revise los datos ingresados')
            return false;
          }
        })
      },

      resetForm() {
        this.user.email = this.email
        this.user.password =''
        this.user.confirm_password =''
        this.user.obra_social_id = this.obra_social_id
        this.user.telefono = this.telefono
      }
    }
  }
</script>

<style lang="scss">
  .el-form-item {
    margin-bottom: 30px;

    .el-form-item__error {
      padding: 4px 15px 0;
    }
  }
  .adm-tittle {
    display:flex;
    justify-content: center;
    margin: 50px 0px;
  }
</style>
