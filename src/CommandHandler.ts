
import { Collection, REST, Routes, RESTPostAPIApplicationCommandsJSONBody, Client } from "discord.js";
import { iCommand } from "./commands/iCommand";
import { Ping } from "./commands/utility/Ping";
import { Server } from "./commands/utility/Server";
import { Say } from "./commands/utility/Say";

export class CommandHandler {

    commands: Collection<String, iCommand>;
    commands_set: RESTPostAPIApplicationCommandsJSONBody[] = [];

    constructor() {
        const cmd_list: iCommand[] = [new Ping, new Server, new Say]
        this.commands = new Collection<String, iCommand>();
        for (const command of cmd_list) {
            this.commands.set(command.data.name, command);
            this.commands_set.push(command.data.toJSON());
        }
    }

    async register(token: string, client_id: string, client: Client) {
        const rest = new REST().setToken(token);
        try {
            console.log(`Started refreshing ${this.commands_set.length} application (/) commands.`);
            await client.application?.commands.set(this.commands_set);
            // const data = await rest.put(
            //     Routes.applicationCommands(client_id),
            //     {
            //         body: this.commands_set
            //     }
            // );
            console.log(`Successfully reloaded`);
        } catch (e) {
            console.log(e);
        }
    }

    list() {
        return this.commands;
    }

}
