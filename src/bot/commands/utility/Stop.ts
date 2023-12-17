
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { SimpleMemoryHelper } from "../../../helpers/SimpleMemoryHelper";
import { PostgresHelper } from "../../../helpers/PostgresHelper";
import env from "../../../helpers/Environment";
import { SessionController } from "../../controller/SessionController";
import { CommonMessage } from "../../../helpers/WrapperHelper";

export class Stop implements ICommand {

    data: SlashCommandBuilder;
    pg_pool: PostgresHelper;

    constructor() {
        this.data = new SlashCommandBuilder();
        this.data.setName('stop')
            .setDescription('Create new game session')
            .addStringOption(option => option.setName('game_code')
                .setRequired(true)
                .setDescription('Input game code'));
        this.pg_pool = new PostgresHelper(
            env.pg.host,
            env.pg.user,
            env.pg.pass,
            env.pg.db,
            env.pg.port);
    }

    async execute(interaction: CommandInteraction) {
        const game_code = interaction.options.get('game_code')?.value?.toString() || "";
        const group_id = interaction.guildId || "";
        const user_id = interaction.user.id;
        const user_name = interaction.user.displayName;
        const channel_id = interaction.channelId;
        
        await interaction.deferReply();

        const session_controller = new SessionController(this.pg_pool);
        const game_session = await session_controller.create(user_id, game_code, group_id, channel_id);
        let content = `Game created by ${user_name} with session code >> ${game_session.data} <<`;
        if(game_session.error){
            const err_cast: CommonMessage = game_session.error;
            content = (err_cast.message === "group id can not be empty")?
            "To create new session, user should execute this command on a discord server":
            err_cast.message;
        }

        await interaction.editReply({
            content
        });
    }
};
