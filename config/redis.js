import { createClient } from "redis";
class Redis {
  constructor() {
    this.host =
      "rediss://default:943df4edddbe457aa7213b4e63f32330@usw1-learning-basilisk-33657.upstash.io:33657";
    this.port = "";
    this.connected = false;
    this.client = null;
  }
  getConnection() {
    if (this.connected) return this.client;
    else {
      this.client = createClient({
        host: this.host,
        port: this.port,
      });
      return this.client;
    }
  }
}

export default new Redis();
