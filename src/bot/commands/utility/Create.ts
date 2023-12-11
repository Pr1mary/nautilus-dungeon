
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { RandomHelper } from "../../../helpers/RandomHelper";
import { SimpleMemoryHelper } from "../../../helpers/SimpleMemoryHelper";
import { SessionModel } from "../model/SessionModel";

export class Create implements ICommand {
    data = new SlashCommandBuilder()
        .setName('create')
        .addStringOption(option => option.setName('game_code')
            .setRequired(true)
            .setDescription('Input game code'))
        .setDescription('Create new game session');

    async execute(interaction: CommandInteraction, simple_mem: SimpleMemoryHelper) {
        const game_code = interaction.options.get('game_code')?.value?.toString() || "";
        const user_id = interaction.user.id;
        const user_name = interaction.user.displayName;
        const session_code = new RandomHelper().string(4);
        const session_id = `${session_code}-${interaction.guildId}`;
        const content = `Game created by ${user_name} with session code >> ${session_code} <<`;

        simple_mem.set(session_id, new SessionModel(user_id, game_code, session_id), user_id);

        await interaction.reply({
            content
        });
    }
};
