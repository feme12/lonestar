import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export async function execute(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId("dashboard_18fj189ghj29vhj39h3h9b")
        .setPlaceholder("Lonestar Dashboard")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("FAQ")
                //.setEmoji("")
                .setDescription("e")
                .setValue("dashboard_faq_afjai12jg92bn2992jd"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Shop")
                //.setEmoji("")
                .setDescription("e")
                .setValue("dashboard_shop_afjai12jg92bn2992jd"),
        );
    const select2 = new StringSelectMenuBuilder()
        .setCustomId("dashboard_89u23ijv892v9jv892hjv89vc")
        .setPlaceholder("Lonestar Support")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("General Support Assistance")
                //.setEmoji("")
                .setDescription("e")
                .setValue("dashboard_GSA_afjai12jg92bn2992jda"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Management Support")
                //.setEmoji("")
                .setDescription("e")
                .setValue("dashboard_MS_afjai12jg92bn2992jda"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Appeal Support")
                //.setEmoji("")
                .setDescription("e")
                .setValue("dashboard_AS_afjai12jg92bn2992jda"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Report a Member")
                //.setEmoji("")
                .setDescription("e")
                .setValue("dashboard_RAM_afjai12jg92bn2992jda"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Department Support")
                //.setEmoji("")
                .setDescription("e")
                .setValue("dashboard_DS_afjai12jg92bn2992jda"),
        );
    const embed = new EmbedBuilder()
        .setColor(2829617)
        .setTitle("‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎‎<:dashboard:1221354619150667826> ‎‎ ‎‎Lonestar Roleplay Dashboard")
        .setDescription("```ansi\n\u001b[2;37m\u001b[1;37mLonestar Roleplays Dashboard is here to assist the server with quick accessibility to our features such as support, our shop, faq, etc!\u001b[0m\u001b[2;37m\u001b[0m\n```")
        .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221336744000098314/Artboard_34_copy_2.png?ex=6612357b&is=65ffc07b&hm=b6bfa2c849fa5f6cdecd1fb4d75df112448171fec240a01137f3ef2a1ff1a9c0&");
        const row = new ActionRowBuilder()
        .addComponents(select2);
    const row2 = new ActionRowBuilder()
        .addComponents(select);

    await interaction.channel.send({
        content:"test",
        components:[row2, row],
        embeds:[embed],
    });
};