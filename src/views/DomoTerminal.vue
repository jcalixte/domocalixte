<template>
  <div class="domo-terminal">
    <div class="columns is-multiline is-centered">
      <div class="column is-one-quarter" v-for="(t, k) in terminals" :key="k">
        <div class="card" :class="{ active: t.state }">
          <div class="card-content" @click="sendSignal(t)">
            <p class="title">{{ t.name }}</p>
            <p class="subtitle">{{ t.label }}</p>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <button class="button is-danger" @click="remove(t.name)">Supprimer</button>
            </p>
          </footer>
        </div>
      </div>
    </div>
    <hr />
    <router-link class="button is-link" :to="{ name: 'new-terminal' }">Ajouter une borne</router-link>
  </div>
</template>

<script>
import terminalService from "../services/TerminalService";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "domo-terminal",
  data() {
    return {
      name: null,
      label: null,
      on: null,
      off: null
    };
  },
  mounted() {
    this.retrieve();
  },
  computed: {
    ...mapGetters(["terminals"])
  },
  methods: {
    ...mapActions(["addTerminal", "removeTerminal", "turnOn", "turnOff"]),
    async retrieve() {
      const terminals = await terminalService.get();
      for (let terminal of terminals) {
        this.addTerminal(terminal);
      }
    },
    async submit() {
      let exist = this.terminals.find(t => t.name === this.name);

      if (exist) {
        console.log(`Une borne porte déjà le nom ${this.name}`);
        return;
      }

      exist = this.terminals.find(t => t.signal.on === this.on);

      if (exist) {
        console.log(`Une borne utilise déjà le code ${this.on} pour allumer.`);
        return;
      }

      exist = this.terminals.find(t => t.signal.off === this.off);

      if (exist) {
        console.log(
          `Une borne utilise déjà le code ${this.off} pour éteindre.`
        );
        return;
      }

      const terminal = {
        name: this.name,
        label: this.label,
        signal: {
          on: this.on,
          off: this.off
        },
        state: false
      };
      await terminalService.add(terminal);
      this.addTerminal(terminal);
      this.name = null;
      this.label = null;
      this.on = null;
      this.off = null;
    },
    async remove(name) {
      await terminalService.remove(name);
      this.removeTerminal(name);
    },
    /**
     *
     */
    async sendSignal(terminal) {
      terminal = {
        ...terminal,
        state: !terminal.state
      };
      await terminalService.update(terminal);
      if (terminal.state) {
        this.turnOn(terminal.name);
      } else {
        this.turnOff(terminal.name);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.card {
  transition: background-color 0.5s ease;
  border-radius: 4px;

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
