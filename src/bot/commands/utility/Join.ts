
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { SessionController } from "../../controller/SessionController";
import { PostgresHelper } from "../../../helpers/PostgresHelper";
import env from "../../../helpers/Environment";
import { CommonMessage } from "../../../helpers/WrapperHelper";

export class Join implements ICommand {

    data: SlashCommandBuilder;
    pg_pool: PostgresHelper;

    constructor() {
        this.data = new SlashCommandBuilder();
        this.data.setName('join')
            .setDescription('Join game session')
            .addStringOption(option => option.setName('session_code')
                .setRequired(true)
                .setDescription('Input session code'));
        this.pg_pool = new PostgresHelper(
            env.pg.host,
            env.pg.user,
            env.pg.pass,
            env.pg.db,
            env.pg.port);
    }

    async execute(interaction: CommandInteraction) {
        const session_code = interaction.options.get('session_code')?.value?.toString() || "";
        const group_id = interaction.guildId || "";
        const user_id = interaction.user.id;
        const user_name = interaction.user.displayName;
        const channel_id = interaction.channelId;

        await interaction.deferReply();

        const session_controller = new SessionController(this.pg_pool);
        const game_session = await session_controller.join(user_id, session_code, group_id, channel_id);
        let content = `Player ${user_name} joined the session`;
        if (game_session.error) {
            const err_cast: CommonMessage = game_session.error;
            content = (err_cast.message === "group id can not be empty") ?
                "Command should be executed in a discord server" :
                err_cast.message;
        }

        await interaction.editReply({
            content
        });
    }
};
