import * as dotenv from "dotenv";
dotenv.config();

export default {
    discord_token: process.env.DISCORD_TOKEN || "",
    pg:{
        host: process.env.PG_HOST || "",
        user: process.env.PG_USER || "",
        pass: process.env.PG_PASS || "",
        db: process.env.PG_DB || "",
        port: Number(process.env.PG_PORT) || 5432,
    },
}
