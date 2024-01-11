import Redis from "ioredis";

class MyRedis {
  constructor() {
    this.host =
      "rediss://default:943df4edddbe457aa7213b4e63f32330@usw1-learning-basilisk-33657.upstash.io:33657";

    this.connected = false;
    this.client = null;
  }
  getConnection() {
    if (this.connected) return this.client;
    else {
      this.client = Redis(
        "rediss://default:943df4edddbe457aa7213b4e63f32330@usw1-learning-basilisk-33657.upstash.io:33657"
      );
      return this.client;
    }
  }
}

export default new MyRedis();
