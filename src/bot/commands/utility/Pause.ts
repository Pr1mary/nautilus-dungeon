
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { PostgresHelper } from "../../../helpers/PostgresHelper";
import env from "../../../helpers/Environment";
import { SessionController } from "../../controller/SessionController";
import { CommonMessage } from "../../../helpers/WrapperHelper";

export class Pause implements ICommand {

    data: SlashCommandBuilder;
    pg_pool: PostgresHelper;

    constructor() {
        this.data = new SlashCommandBuilder();
        this.data.setName('pause')
            .setDescription('Pause game session');
        this.pg_pool = new PostgresHelper(
            env.pg.host,
            env.pg.user,
            env.pg.pass,
            env.pg.db,
            env.pg.port);
    }

    async execute(interaction: CommandInteraction) {
        const group_id = interaction.guildId || "";
        const user_id = interaction.user.id;
        const user_name = interaction.user.displayName;
        const channel_id = interaction.channelId;

        await interaction.deferReply();

        const session_controller = new SessionController(this.pg_pool);
        const game_session = await session_controller.updateSession(user_id, group_id, channel_id, true, false);
        let content = `Session paused`;
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
