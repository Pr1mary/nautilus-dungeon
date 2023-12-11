
import { SimpleMemoryHelper } from "../helpers/SimpleMemoryHelper";
import { Client, Collection, Events, GatewayIntentBits, Invite } from "discord.js";
import { CommandHandler } from "./commands/CommandHandler";
import { EventProcess } from "./EventsProcess";

export class Bot{
    
    token = "";
    client: Client;
    cmd_handler: CommandHandler;
    simple_mem: SimpleMemoryHelper;

    constructor(token: string){
        this.token = token || "";
        this.simple_mem = new SimpleMemoryHelper()
        this.cmd_handler = new CommandHandler();
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent
            ],
        });
    }
    
    init(){
        const event_process = new EventProcess(this.client, this.cmd_handler);
        event_process.onInteraction(this.simple_mem);
        event_process.onReady(this.token);
        this.client.login(this.token);
    }

}


