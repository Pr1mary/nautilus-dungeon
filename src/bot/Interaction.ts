import * as dotenv from "dotenv";
dotenv.config();
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { SimpleMemoryHelper } from "../helpers/SimpleMem";

export const onInteraction = (client: Client, command_handler: CommandHandler, simple_mem: SimpleMemoryHelper) => {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const commands = command_handler.list();
        const command = commands.get(interaction.commandName);
        if (!command) return;
        
        try {
            await command.execute(interaction, simple_mem);
        } catch (e) {
            console.error(e);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this commmand!',
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this commmand!',
                    ephemeral: true,
                });
            }
        }
    })
}