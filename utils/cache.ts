
import { Redis } from "ioredis";
import { config } from 'dotenv';
config();

export const redis = new Redis(39698, 'redis://default:a0782c43c267435c870836af5a8c3a16@optimum-alien-39698.upstash.io');
    // {
    // host: process.env.REDIS_URL,
    // port: 31054,
// }
