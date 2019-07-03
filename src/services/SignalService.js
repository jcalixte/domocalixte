import api from "../api";

class SignalService {
  async send(signal) {
    await api.put(`/signal/${signal}`);
  }
}

export default new SignalService();
