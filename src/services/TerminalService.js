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

  async update(terminal) {
    try {
      const response = await api.put("/terminal", terminal);
      if (response) {
        return response.data;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async remove(name) {
    await api.delete(`/terminal/${name}`);
  }
}

export default new TerminalService();
