import * as dotenv from "dotenv";
dotenv.config();
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { CommandHandler } from "./CommandHandler";

const token = process.env.DISCORD_TOKEN || "";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

const commandHandler = new CommandHandler();

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const commands = commandHandler.list();
    const command = commands.get(interaction.commandName);
    if(!command){
        return;
    }

    try {
        await command.execute(interaction);
    }catch(e){
        console.error(e);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({
                content: 'There was an error while executing this commmand!',
                ephemeral: true,
            });
        }else{
            await interaction.reply({
                content: 'There was an error while executing this commmand!',
                ephemeral: true,
            });
        }
    }

    // console.log(interaction);
})

client.once(Events.ClientReady, async ready_client => {
    await commandHandler.register(token, ready_client.user.id, client);
    console.log(`Ready! Logged in as ${ready_client.user.tag}`);
});

client.login(token);
