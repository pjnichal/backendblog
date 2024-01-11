import Redis from "ioredis";
export const client = new Redis(
  "rediss://default:943df4edddbe457aa7213b4e63f32330@usw1-learning-basilisk-33657.upstash.io:33657"
);
