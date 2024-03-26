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

import { set_ticket_number, checkblacklist, Data } from "../../utils.js";
import { db } from "../../database.js";
import moment from "moment";
import {transcript_channel_id, staff_role_id_1, staff_role_id_2, staff_role_id_3, gsa_catagory_id, ms_catagory_id, as_catagory_id, ram_catagory_id, ds_catagory_id} from "../../config.js";


export default async function(interaction, client, handler) {
    if(!interaction.isModalSubmit()) return;
    if(interaction.customId === "dashboard_modal_gsa") {
        const reason_for_open = interaction.fields.getTextInputValue("gsa_input1");
        const guild = interaction.guild;
        const user = interaction.user;
        const user_in_guild = guild.members.cache.get(user.id);
        const ticket_catagory = guild.channels.cache.get(gsa_catagory_id);

        const overwrites = [
            {
                id: guild.id,
                deny: [PermissionFlagsBits.ViewChannel],
            },
            //Ticket owner
            {
                id: user.id,
                allow: [
                    PermissionFlagsBits.AttachFiles,
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ReadMessageHistory
                ],
                deny: [
                    PermissionFlagsBits.MentionEveryone
                ]
            },
            //staff1
            {
                id: staff_role_id_1,
                allow: [
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.AttachFiles,
                    PermissionFlagsBits.ReadMessageHistory
                ],
                deny: [
                    PermissionFlagsBits.ManageMessages
                ]
            },
            //staff2
            {
                id: staff_role_id_2,
                allow: [
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.AttachFiles,
                    PermissionFlagsBits.ReadMessageHistory
                ],
                deny: [
                    PermissionFlagsBits.ManageMessages
                ]
            },
            //staff3
            {
                id: staff_role_id_3,
                allow: [
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.AttachFiles,
                    PermissionFlagsBits.ReadMessageHistory
                ],
                deny: [
                    PermissionFlagsBits.ManageMessages
                ]
            },
        ];

        if(await checkblacklist(user)) {
            const embed = new EmbedBuilder()
            .setTitle("‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎ ‎‎‎     <:RTicket:1203452513970552922> ‎‎ ‎‎Error Opening TIcket")
            .setDescription("**You are blacklisted from using our ticket system, please get in touch with a management+ if you think this is false.**")
            .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221382143989776464/Artboard_34_copy_6.png?ex=66125fc3&is=65ffeac3&hm=07c103f64db6d97f439463a9deb256a7d6e03d724682344b9e8fd04bd7fa05c3&")
            .setColor(12077385);
            interaction.reply({
            embeds:[embed],
            ephemeral:true
            });
            return;
        };

        const ticket = await guild.channels.create({
            type: ChannelType.GuildText,
            name:"GS-"+await set_ticket_number(),
            permissionOverwrites: overwrites,
            parent: ticket_catagory
        });

        //ticket.send({content:"<@&"+staff_role_id_1+"><@&"+staff_role_id_2+"><@&"+staff_role_id_3+">"})
        const ticket_embed = new EmbedBuilder()
            .setTitle("‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎‎<:OTicket:1203452515635437579> ‎‎ ‎‎Lonestar Roleplay Ticket")
            .setDescription("**Hey there <@"+user.id+">, welcome to your General Support, we thank you for coming if you have any proof/media/proof of purchase you need to send, just send it down below. a member from our support team will be with you momentarily!**\n\n```\n• Please Do Not Ping Support\n• Please be Patient and respect our staff team\n•  Do not troll, spam, send derogatory content without permission```")
            .setColor(2829617)

        const ticket_opened_embed = new EmbedBuilder()
            .setTitle("‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎‎<:OTicket:1203452515635437579> ‎‎ ‎‎Lonestar Roleplay Ticket")
            .setDescription("Your ticket has been opened, click this here to fast travel to it <#"+ticket.id+">")
            .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221382143989776464/Artboard_34_copy_6.png?ex=66125fc3&is=65ffeac3&hm=07c103f64db6d97f439463a9deb256a7d6e03d724682344b9e8fd04bd7fa05c3&")
            .setColor(2829617);

        const ticket_info = new EmbedBuilder()
            .setTitle("‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎‎<:OTicket:1203452515635437579> ‎‎ ‎‎Ticket Information")
            .setDescription("Why are you opening this ticket?\n```"+reason_for_open+"```")
            .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221382143989776464/Artboard_34_copy_6.png?ex=66125fc3&is=65ffeac3&hm=07c103f64db6d97f439463a9deb256a7d6e03d724682344b9e8fd04bd7fa05c3&")
            .setColor(2829617);

        const close_button = new ButtonBuilder()
            .setCustomId("GSA_Close")
            .setLabel("Close")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("<:RTicket:1203452513970552922>")

        const claim_button = new ButtonBuilder()
            .setCustomId("GSA_Claim")
            .setLabel("Claim")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("<:GTicket:1203452516868689934>")

        const actionrow = new ActionRowBuilder().addComponents(close_button, claim_button);

        ticket.send({
            embeds:[ticket_embed, ticket_info],
            components: [actionrow]
        });

        interaction.reply({
            embeds: [ticket_opened_embed],
            ephemeral:true
        })

        const current_time = new moment.utc();

        const unix = current_time.unix()

        const data = new Data(''+user.id+'', ''+reason_for_open+'', ''+unix+'', [], null);

        await db.set(ticket.name, data);
    }
}