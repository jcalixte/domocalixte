import api from "../api";

class TerminalService {
  async add(terminal) {
    await api.post("/terminal", terminal);
  }

  async get() {
    try {
      const response = await api.get("/terminal");
      if (response) {
        return response.data;
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  async remove(name) {
    await api.delete(`/terminal/${name}`);
  }
}

export default new TerminalService();
