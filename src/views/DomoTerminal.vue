<template>
  <div class="domo-terminal">
    <div class="buttons has-addons is-centered">
      <router-link
        tag="button"
        class="button is-primary"
        :to="{ name: 'new-terminal' }"
      >
        Ajouter une borne
      </router-link>
      <button
        class="button is-danger"
        :class="{ 'is-outlined': !openRemove }"
        @click="openRemove = !openRemove"
      >
        Gérer les bornes
      </button>
    </div>
    <div class="columns no-margin is-multiline is-centered" v-if="terminals.length">
      <div class="column is-one-quarter" v-for="(t, k) in terminals" :key="k">
        <div class="card" :class="{ active: t.state }">
          <div class="card-content" @click="sendSignal(t)">
            <p class="title">{{ t.name }}</p>
            <p class="subtitle">{{ t.label }}</p>
          </div>
          <footer class="card-footer" v-if="openRemove">
            <p class="card-footer-item">
              <button class="button is-danger" @click="remove(t.name)">
                Supprimer
              </button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import terminalService from '../services/TerminalService'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'domo-terminal',
  data() {
    return {
      name: null,
      label: null,
      on: null,
      off: null,
      openRemove: false
    }
  },
  mounted() {
    this.retrieve()
  },
  computed: {
    ...mapGetters(['terminals'])
  },
  methods: {
    ...mapActions(['addTerminal', 'removeTerminal', 'turnOn', 'turnOff']),
    async retrieve() {
      const terminals = await terminalService.get()
      for (let terminal of terminals) {
        this.addTerminal(terminal)
      }
    },
    async submit() {
      let exist = this.terminals.find((t) => t.name === this.name)

      if (exist) {
        console.log(`Une borne porte déjà le nom ${this.name}`)
        return
      }

      exist = this.terminals.find((t) => t.signal.on === this.on)

      if (exist) {
        console.log(`Une borne utilise déjà le code ${this.on} pour allumer.`)
        return
      }

      exist = this.terminals.find((t) => t.signal.off === this.off)

      if (exist) {
        console.log(`Une borne utilise déjà le code ${this.off} pour éteindre.`)
        return
      }

      const terminal = {
        name: this.name,
        label: this.label,
        signal: {
          on: this.on,
          off: this.off
        },
        state: false
      }
      await terminalService.add(terminal)
      this.addTerminal(terminal)
      this.name = null
      this.label = null
      this.on = null
      this.off = null
    },
    async remove(name) {
      await terminalService.remove(name)
      this.removeTerminal(name)
    },
    /**
     *
     */
    sendSignal(terminal) {
      terminal = {
        ...terminal,
        state: !terminal.state
      }
      terminalService.update(terminal)
      if (terminal.state) {
        this.turnOn(terminal.name)
      } else {
        this.turnOff(terminal.name)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.card {
  transition: background-color 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  border-radius: 4px;
  margin: 15px;

  .card-content:hover {
    cursor: pointer;
  }

  &.active {
    background-color: $primary;
    .title,
    .subtitle {
      color: $white;
    }
  }
}
</style>
