
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { iCommand } from "../iCommand";
import { Randomizer } from "../../../helpers/Randomizer";
import { SimpleMemoryHelper } from "../../../helpers/SimpleMem";

export class Start implements iCommand {
    data = new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start game session');

    async execute(interaction: CommandInteraction){
        const game_code = interaction.options.get('game_code')?.value;
        const user_data = {
            id: interaction.user.id,
            name: interaction.user.username
        }
        const session_id = new Randomizer().string(15);
        const content = `Game session begin!`;

        console.log({
            user_data,
            game_code,
            session_id
        })

        await interaction.reply({
            content
        });
    }
};
