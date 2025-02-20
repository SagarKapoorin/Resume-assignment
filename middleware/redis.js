import dotenv from 'dotenv';
import { createClient } from "redis";
dotenv.config();
// modify redis url according
const redisUrl =process.env.redisUrl || "redis://127.0.0.1:6379";
const client = createClient({
  url: redisUrl,
});

client.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Could not connect to Redis", err);
  }
}

connectRedis();

export const rateLimit=async(req, res, next)=>{
    const ip =req.ip || req.connection.remoteAddress;
    const requests=await client.incr(ip);
    if (requests===1) {
        await client.expire(ip, 60); //set the expiration to 60 seconds
    }
    if (requests>20) { //limit to 20 requests per minute
        const ttl = await client.ttl(ip);
        res.status(429).json({ error: "Rate-Limit Reached, Try again Later after "+ttl+" seconds" });
        return;
    }
    next();
}