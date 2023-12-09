
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { iCommand } from "../iCommand";
import { Randomizer } from "../../../helpers/Randomizer";
import { SimpleMemoryHelper } from "../../../helpers/SimpleMem";
import { SessionModel } from "../model/SessionModel";

export class Create implements iCommand {
    data = new SlashCommandBuilder()
        .setName('create')
        .addStringOption(option => option.setName('game_code')
            .setRequired(true)
            .setDescription('Input game code'))
        .setDescription('Create new game session');

    async execute(interaction: CommandInteraction, simpleMem: SimpleMemoryHelper) {
        const game_code = interaction.options.get('game_code')?.value?.toString() || "";
        const user_id = interaction.user.id;
        const user_name = interaction.user.displayName;
        const session_code = new Randomizer().string(4);
        const session_id = `${session_code}-${interaction.guildId}`;
        const content = `Game created by ${user_name} with session code >> ${session_code} <<`;

        simpleMem.set(session_id, new SessionModel(user_id, game_code, session_id));

        await interaction.reply({
            content
        });
    }
};
