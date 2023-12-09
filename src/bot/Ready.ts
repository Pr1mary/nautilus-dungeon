
import { Client, Events } from "discord.js";
import { CommandHandler } from "./CommandHandler";

export const onReady = (client: Client, commandHandler: CommandHandler, token: string) => {
    client.once(Events.ClientReady, async ready_client => {
        await commandHandler.register(token, ready_client.user.id, client);
        console.log(`Ready! Logged in as ${ready_client.user.tag}`);
    });
}