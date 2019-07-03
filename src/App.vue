<template>
  <div id="app">
    <header>
      <router-link :to="{ name: 'domo-home' }">Domotique Calixte</router-link>
      <general-password />
      <domo-weather class="info" />
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import "notyf/notyf.min.css";
import DomoWeather from "./components/DomoWeather.vue";
import GeneralPassword from "./components/GeneralPassword.vue";

export default {
  name: "app",
  components: {
    DomoWeather,
    GeneralPassword
  }
};
</script>

<style lang="scss">
@import "~bulma";

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header a {
  color: white;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  margin-top: 6px;
  text-decoration: none;
}

header .info {
  float: right;
}
</style>
