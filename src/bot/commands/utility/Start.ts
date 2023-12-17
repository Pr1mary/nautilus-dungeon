
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { SimpleMemoryHelper } from "../../../helpers/SimpleMemoryHelper";
import { SessionModel } from "../../model/SessionModel";

export class Start implements ICommand {
    data = new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start game session');

    async execute(interaction: CommandInteraction, simple_mem: SimpleMemoryHelper){
        
        const user_id = interaction.user.id;
        const content = `Game session begin!`;

        const curr_memory = await simple_mem.getByCreator(user_id);
        if(curr_memory.error !== null){
            await interaction.reply({
                content: "Game session not created yet!"
            });
            return;
        }

        const curr_session: SessionModel = curr_memory.data;
        // const res_session = curr_session.start()
        // if(res_session.error !== null){
        //     await interaction.reply({
        //         content: "Session already started!"
        //     });
        //     return;
        // }

        await interaction.reply({
            content
        });
    }
};
