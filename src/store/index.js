import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    terminals: []
  },
  getters: {
    terminals: state => state.terminals
  },
  actions: {
    addTerminal({ commit }, terminal) {
      commit("ADD_TERMINAL", terminal);
    },
    removeTerminal({ commit }, name) {
      commit("REMOVE_TERMINAL", name);
    },
    turnOn({ commit }, name) {
      commit("SWITCH", { name, terminalState: true });
    },
    turnOff({ commit }, name) {
      commit("SWITCH", { name, terminalState: false });
    },
    clear({ commit }) {
      commit("CLEAR_TERMINAL");
    }
  },
  mutations: {
    ADD_TERMINAL(state, terminal) {
      const existingTerminal = state.terminals.find(
        t => t.name === terminal.name
      );
      if (!existingTerminal) {
        state.terminals.push(terminal);
      }
    },
    REMOVE_TERMINAL(state, name) {
      state.terminals = state.terminals.filter(t => t.name !== name);
    },
    CLEAR_TERMINAL(state) {
      state.terminals = [];
    },
    SWITCH(state, { name, terminalState }) {
      const index = state.terminals.findIndex(t => t.name === name);
      if (index >= 0) {
        const terminal = state.terminals[index];
        terminal.state = terminalState;
        Vue.set(state.terminals, index, terminal);
      }
    }
  }
});

export default store;
