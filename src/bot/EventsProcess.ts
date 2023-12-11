
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { CommandHandler } from "./commands/CommandHandler";
import { SimpleMemoryHelper } from "../helpers/SimpleMemoryHelper";

export class EventProcess {

    client: Client;
    command_handler: CommandHandler;

    constructor(client: Client, command_handler: CommandHandler) {
        this.client = client;
        this.command_handler = command_handler;
    }

    onInteraction(simple_mem: SimpleMemoryHelper) {
        this.client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;
            const commands = this.command_handler.list();
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

    onReady(token: string) {
        this.client.once(Events.ClientReady, async ready_client => {
            await this.command_handler.register(token, ready_client.user.id, this.client);
            console.log(`Ready! Logged in as ${ready_client.user.tag}`);
        });
    }

}
