import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { db as database } from "../database.js";

export const data = new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluates javascript code (adhdbob only)')
    .setDMPermission(false)
    .addStringOption(option => option.setName('code').setDescription('The code to evaulate').setRequired(true));

export async function run({ interaction }) {
    if(interaction.user.id === "696158716617031711" || interaction.user.id === "634140757812314114") {
        var code = interaction.options.getString('code');
        var output;
  
        try {
          output = await eval(code);
        } catch (e) {
          output = e.toString();
        }
  
        var replyString = `**Input:**\n\`\`\`js\n${code}\n\`\`\`\n\n**Output:**\n\`\`\`js\n${output}\n\`\`\``;
  
        if (interaction.replied) {
          const embed = new EmbedBuilder()
          .setColor("Blurple")
          .setDescription(replyString);
  
          await interaction.editReply({ content:``, embeds:[embed], ephemeral: true });
        } else {
          const embed = new EmbedBuilder()
          .setColor("Blurple")
          .setDescription(replyString);
  
          await interaction.reply({ content:``, embeds:[embed], ephemeral: true });
        };
    };
}