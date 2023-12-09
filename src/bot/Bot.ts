
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

        const simpleMem = new SimpleMemoryHelper()
        
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent
            ],
        });
        
        const commandHandler = new CommandHandler();
        
        onInteraction(this.client, commandHandler, simpleMem);
        
        onReady(this.client, commandHandler, this.token);
    }
    
    init(){
        this.client.login(this.token);
    }

}


