import {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    PermissionsBitField,
    PermissionFlagsBits,
    version,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    Colors,
    ChannelType,
    SlashCommandBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";

export default async function (interaction, client, handler) {
    if(!interaction.isAnySelectMenu()) return;
    if(interaction.customId === "dashboard_89u23ijv892v9jv892hjv89vc") {
        if(interaction.values[0] === "dashboard_GSA_afjai12jg92bn2992jda") {
        const GSA_Modal = new ModalBuilder()
            .setCustomId("dashboard_modal_gsa")
            .setTitle("General Support Assistance");
        const gsa_input1 = new TextInputBuilder()
            .setCustomId("gsa_input1")
            .setLabel("Why are you opening this ticket?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        
        const actionrow = new ActionRowBuilder().addComponents(gsa_input1);

        GSA_Modal.addComponents(actionrow);

        await interaction.showModal(GSA_Modal);
        } else if (interaction.values[0] === "dashboard_MS_afjai12jg92bn2992jda") {
        const MS_Modal = new ModalBuilder()
            .setTitle("Management Support")
            .setCustomId("dashboard_modal_ms");
        
        const ma_input1 = new TextInputBuilder()
            .setCustomId("ma_input1")
            .setLabel("Why are you opening this ticket?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        
        
        const actionrow = new ActionRowBuilder().addComponents(ma_input1);

        MS_Modal.addComponents(actionrow);

        await interaction.showModal(MS_Modal);
        } else if (interaction.values[0] === "dashboard_AS_afjai12jg92bn2992jda") {
        const AS_Modal = new ModalBuilder()
            .setTitle("Appeal Support")
            .setCustomId("dashboard_modal_as");
        
        const as_input1 = new TextInputBuilder()
            .setCustomId("as_input1")
            .setLabel("Who is appealing?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const as_input2 = new TextInputBuilder()
            .setCustomId("as_input2")
            .setLabel("Did they get banned from in-game or discord?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        
        const as_input3 = new TextInputBuilder()
            .setCustomId("as_input3")
            .setLabel("What was the reason for the Ban?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        
        
        const actionrow = new ActionRowBuilder().addComponents(as_input1);
        const actionrow2 = new ActionRowBuilder().addComponents(as_input2);
        const actionrow3 = new ActionRowBuilder().addComponents(as_input3);

        AS_Modal.addComponents(actionrow, actionrow2, actionrow3);

        await interaction.showModal(AS_Modal);
        } else if (interaction.values[0] === "dashboard_RAM_afjai12jg92bn2992jda") {
        const RAM_Modal = new ModalBuilder()
            .setTitle("Report a Member")
            .setCustomId("dashboard_modal_ram");
        
        const ram_input1 = new TextInputBuilder()
            .setCustomId("ram_input1")
            .setLabel("Who are you reporting?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const ram_input2 = new TextInputBuilder()
            .setCustomId("ram_input2")
            .setLabel("What did they do?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        
        
        const actionrow = new ActionRowBuilder().addComponents(ram_input1);
        const actionrow2 = new ActionRowBuilder().addComponents(ram_input2);

        RAM_Modal.addComponents(actionrow, actionrow2);

        await interaction.showModal(RAM_Modal);
        } else if (interaction.values[0] === "dashboard_DS_afjai12jg92bn2992jda") {
        const DS_Modal = new ModalBuilder()
            .setTitle("Department Support")
            .setCustomId("dashboard_modal_ds");
        
        const ds_input1 = new TextInputBuilder()
            .setCustomId("ds_input1")
            .setLabel("Why are you opening this ticket?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        
        const actionrow = new ActionRowBuilder().addComponents(ds_input1);

        DS_Modal.addComponents(actionrow);

        await interaction.showModal(DS_Modal);
        }
    }
};