
import env from "./helpers/Environment";
import { Bot } from "./bot/Bot";

(()=>{
    const bot = new Bot(env.discord_token);
    bot.init();

})();