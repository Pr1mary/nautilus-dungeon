
import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface iCommand {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): Promise<void>;
}
