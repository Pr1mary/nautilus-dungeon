
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { iCommand } from "../iCommand";

export class Server implements iCommand {
    data = new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with Pong!');

    async execute(interaction: CommandInteraction){
        const guild_name = interaction.guild?.name;
        const guild_member_cnt = interaction.guild?.memberCount;
        const content = `Server name: ${guild_name}; Member counts: ${guild_member_cnt}`;

        await interaction.reply({
            content
        });
    }
};
