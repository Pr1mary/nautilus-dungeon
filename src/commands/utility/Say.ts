
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { iCommand } from "../iCommand";

export class Say implements iCommand {
    data = new SlashCommandBuilder()
        .setName('say')
        .addStringOption(option => option.setName('input')
            .setDescription('The input will showup in server'))
        .setDescription('Say something to the server');

    async execute(interaction: CommandInteraction){
        const content = "Confirmed!";
        const user_input = interaction.options.get('input');

        console.log(`${interaction.user.displayName} say ${user_input?.value}`);

        await interaction.reply({
            content
        });
    }
};
