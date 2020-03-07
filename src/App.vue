<template>
  <div id="app">
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'domo-home' }"
          >Au 72</router-link
        >
        <domo-weather class="navbar-item info" />
        <router-link
          v-if="showPassword"
          class="navbar-item"
          :to="{ name: 'general-password' }"
          >Mot de passe</router-link
        >
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import 'notyf/notyf.min.css'
import passwordService from '@/services/PasswordService'
import DomoWeather from '@/components/DomoWeather.vue'

export default {
  name: 'app',
  components: {
    DomoWeather
  },
  data() {
    return {
      showPassword: false,
      active: false
    }
  },
  async mounted() {
    await this.getPassword()
  },
  methods: {
    toggle() {
      this.active = !this.active
    },
    async getPassword() {
      const password = await passwordService.getPassword()
      this.showPassword = !password
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
