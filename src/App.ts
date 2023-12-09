
import Environment from "./helpers/Environment";
import { Bot } from "./bot/Bot";

(()=>{
    const bot = new Bot(Environment.DISCORD_TOKEN);
    bot.init();

})();