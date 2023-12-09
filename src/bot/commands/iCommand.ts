
import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface iCommand {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction, ...args: any): Promise<void>;
}
