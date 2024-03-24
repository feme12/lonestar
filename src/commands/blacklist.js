import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { db as database } from "../database.js";

export const data = new SlashCommandBuilder()
  .setName("ticket-blacklist")
  .setDescription("Blacklists someone from opening a ticket.")
  .addStringOption(option => option.setName("userid").setDescription("The userid of the person to blacklist.").setRequired(true));

export async function run({ interaction }) {
  const userid = interaction.options.getString("userid");

  try {
    const blacklisted = await database.get("ticket-blacklist") || [];

    if (blacklisted.includes(userid)) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Error")
        .setDescription(`The userid ${userid} is already blacklisted. If you think this is an error, please contact <@696158716617031711>`);

      interaction.reply({ content: '', embeds: [embed] });
      return;
    }

    blacklisted.push(userid);
    await database.set("ticket-blacklist", blacklisted);

    const embed = new EmbedBuilder()
      .setColor("White")
      .setTitle("Success")
      .setDescription(`I have blacklisted the userid ${userid}.`);

    interaction.reply({ content: '', embeds: [embed] });
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