<template>
  <div class="domo-terminal">
    <h2 class="title is-2">Nouvelle borne</h2>
    <form action="#" @submit.prevent="submit">
      <div class="columns is-centered is-multiline">
        <div class="column is-half">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="name">Nom</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    id="name"
                    name="name"
                    v-model="name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="name">Description</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    id="label"
                    name="label"
                    v-model="label"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="signal-on">Signal ON</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    id="signal-on"
                    name="signal-on"
                    v-model="on"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="signal-off">Signal OFF</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    id="signal-off"
                    name="signal-off"
                    v-model="off"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="button is-primary" type="submit">Créer</button>
    </form>
  </div>
</template>

<script>
import terminalService from '../services/TerminalService'
import { mapActions, mapGetters } from 'vuex'
import { Notyf } from 'notyf'

export default {
  name: 'new-terminal',
  data() {
    return {
      name: null,
      label: null,
      on: null,
      off: null
    }
  },
  computed: {
    ...mapGetters(['terminals'])
  },
  methods: {
    ...mapActions(['addTerminal', 'removeTerminal', 'turnOn', 'turnOff']),
    async submit() {
      const notif = new Notyf()
      let exist = this.terminals.find((t) => t.name === this.name)

      if (exist) {
        notif.error(`Une borne porte déjà le nom ${this.name}`)
        return
      }

      exist = this.terminals.find((t) => t.signal.on === this.on)

      if (exist) {
        notif.error(`Une borne utilise déjà le code ${this.on} pour allumer.`)
        return
      }

      exist = this.terminals.find((t) => t.signal.off === this.off)

      if (exist) {
        notif.error(`Une borne utilise déjà le code ${this.off} pour éteindre.`)
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
      this.$router.push('/')
    }
  }
}
</script>

<style>
form {
  margin: 15px;
}
</style>