<template>
  <div class="general-password">
    <div v-if="showPassword">
      <input class="input" placeholder="mot de passe" v-model="password" />
      <button class="button is-outlined" @click="checkPassword">Valider</button>
    </div>
    <div v-else>
      <button class="button is-outlined" @click="resetPassword">Reset</button>
    </div>
  </div>
</template>

<script>
import passwordService from '../services/PasswordService'
import { Notyf } from 'notyf'

export default {
  name: 'general-password',
  data() {
    return {
      showPassword: false,
      password: ''
    }
  },
  async mounted() {
    await this.getPassword()
  },
  methods: {
    async getPassword() {
      this.password = await passwordService.getPassword()
      this.showPassword = !this.password
    },
    async checkPassword() {
      const result = await passwordService.checkPassword(this.password)
      if (result) {
        await this.getPassword()
      } else {
        new Notyf().error('check password failed')
      }
    },
    async resetPassword() {
      const result = await passwordService.reset()
      if (result) {
        this.password = ''
        this.showPassword = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.general-password {
  display: inline-block;
  input {
    max-width: 200px;
  }
}
</style>
