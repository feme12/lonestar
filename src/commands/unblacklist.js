import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { db as database } from "../database.js";

export const data = new SlashCommandBuilder()
  .setName("ticket-unblacklist")
  .setDescription("Unblacklists someone from opening a ticket.")
  .addStringOption(option => option.setName("userid").setDescription("The userid of the person to unblacklist.").setRequired(true));

export async function run({ interaction }) {
  const userid = interaction.options.getString("userid");

  try {
    const blacklisted = await database.get("ticket-blacklist") || [];

    if (blacklisted.includes(userid)) {
        blacklisted.pop(userid);
        await database.set("ticket-blacklist", blacklisted);
        const embed = new EmbedBuilder()
        .setColor("White")
        .setTitle("Success")
        .setDescription(`The userid ${userid} has been unblacklisted.`);

      interaction.reply({ content: '', embeds: [embed] });
      return;
    } else {
        const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Error")
        .setDescription(`Error userid ${userid} is not blacklisted. If you think this is a error please contact <@696158716617031711>`);
  
        interaction.reply({ content: '', embeds: [embed] });
    }
  } catch (e) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Error")
      .setDescription(`Error adding ${userid} to the blacklist. Please contact <@696158716617031711>`);

    interaction.reply({ content: '', embeds: [embed] });

    console.error(e);
  }
}

export const options = {
  devOnly: true,
};