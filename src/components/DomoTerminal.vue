<template>
  <div class="domo-terminal">
    <a class="button" @click.prevent="retrieve">
      <i class="glyph-icon flaticon-update-arrow"></i>
    </a>
    <ul v-if="terminals.length">
      <li v-for="(t, k) in terminals" :key="k">
        <h3>{{ t.name }}, {{ t.label }}</h3>
        <h4>
          <span v-if="t.alight">Allumé</span>
          <span v-else>Éteins</span>
        </h4>
        <div>({{ t.signal.on }}, {{ t.signal.off }})</div>
        <button class="button" @click="remove(t.name)">Supprimer</button>
        <button class="button" @click="sendSignal(t, true)">Allumer</button>
        <button class="button" @click="sendSignal(t, false)">Éteindre</button>
      </li>
    </ul>
    <h2>Nouvelle borne</h2>
    <form action="#" @submit.prevent="submit">
      <label for="name">Nom</label>
      <input type="text" id="name" name="name" v-model="name" />
      <label for="label">Label</label>
      <input type="text" id="label" name="label" v-model="label" />
      <label for="signal-on">Signal On</label>
      <input type="text" id="signal-on" name="signal-on" v-model="on" />
      <label for="signal-off">Signal Off</label>
      <input type="text" id="signal-off" name="signal-off" v-model="off" />
      <button class="button" type="submit">Créer</button>
    </form>
  </div>
</template>

<script>
import terminalService from "../services/TerminalService";
import signalService from "../services/SignalService";
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
        }
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
    async sendSignal(terminal, alight) {
      if (alight) {
        await signalService.send(terminal.signal.on);
        this.turnOn(terminal.name);
      } else {
        await signalService.send(terminal.signal.off);
        this.turnOff(terminal.name);
      }
    }
  }
};
</script>
