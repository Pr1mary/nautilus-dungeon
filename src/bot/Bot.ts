
import { SimpleMemoryHelper } from "../helpers/SimpleMem";
import { Client, Collection, Events, GatewayIntentBits, Invite } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { onReady } from "./Ready";
import { onInteraction } from "./Interaction";

export class Bot{
    
    token = "";
    client: Client;

    constructor(token: string){
        this.token = token || "";

        const simple_mem = new SimpleMemoryHelper()
        
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent
            ],
        });
        
        const cmd_handler = new CommandHandler();
        
        onInteraction(this.client, cmd_handler, simple_mem);
        
        onReady(this.client, cmd_handler, this.token);
    }
    
    init(){
        this.client.login(this.token);
    }

}


