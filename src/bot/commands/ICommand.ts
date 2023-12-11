
import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface ICommand {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction, ...args: any): Promise<void>;
}
