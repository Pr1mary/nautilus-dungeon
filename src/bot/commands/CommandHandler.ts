
import { Collection, REST, Routes, RESTPostAPIApplicationCommandsJSONBody, Client } from "discord.js";
import { ICommand } from "./ICommand";
import { Server } from "./utility/Server";
import { Create } from "./utility/Create";
import { Join } from "./utility/Join";
import { Start } from "./utility/Start";
import { Stop } from "./utility/Stop";
import { Show } from "./utility/Show";
import { Pause } from "./utility/Pause";

export class CommandHandler {

    commands: Collection<String, ICommand>;
    commands_set: RESTPostAPIApplicationCommandsJSONBody[] = [];

    constructor() {
        const cmd_list: ICommand[] = [
            new Server, new Create, new Join, new Start, new Stop, new Show, new Pause
        ];
        this.commands = new Collection<String, ICommand>();
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
