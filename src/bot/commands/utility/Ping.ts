
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { iCommand } from "../iCommand";

export class Ping implements iCommand {
    data = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!');

    async execute(interaction: CommandInteraction){
        const content = "Pong!";

        await interaction.reply({
            content
        });
    }
};
