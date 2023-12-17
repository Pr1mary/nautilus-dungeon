
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { SimpleMemoryHelper } from "../../../helpers/SimpleMemoryHelper";
import { SessionModel } from "../../model/SessionModel";

export class Join implements ICommand {
    data = new SlashCommandBuilder()
        .setName('join')
        .addStringOption(option => option.setName('session_code')
            .setRequired(true)
            .setDescription('Input session code'))
        .setDescription('Join game session');

    async execute(interaction: CommandInteraction, simple_mem: SimpleMemoryHelper){
        const session_code = interaction.options.get('session_code')?.value?.toString() || "";
        const user_id = interaction.user.id;
        const user_name = interaction.user.displayName;
        const session_id = `${session_code}-${interaction.guildId}`;
        const content = `Player ${user_name} joined the session`;

        const get_session = await simple_mem.get(session_id);
        if(get_session.error !== null){
            await interaction.reply({
                content: "Session code not found!",
            });
            return;
        }
        const curr_session: SessionModel = get_session.data;
        // const result = curr_session.join(user_id);
        // if(result.error !== null){
        //     await interaction.reply({
        //         content: result.error["message"],
        //     });
        //     return;
        // }

        await interaction.reply({
            content
        });
    }
};
