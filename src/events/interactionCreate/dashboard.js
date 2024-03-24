import { EmbedBuilder } from "discord.js";

export default async function(interaction, client, handler) {
    if(!interaction.isAnySelectMenu()) return;
    if(interaction.customId === "dashboard_18fj189ghj29vhj39h3h9b") {
        if(interaction.values[0] === "dashboard_faq_afjai12jg92bn2992jd") {
            const faq_embed = new EmbedBuilder()
                .setTitle("‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎ ‎‎‎‎ ‎‎ ‎‎<:Search:1203452526138228798> Lonestar Facts And Questions")
                .setDescription("```ansi\n\u001b[2;33m\u001b[1;33mQ: How do I become a Staff Member?\u001b[0m\u001b[2;33m\u001b[0m\n\n\u001b[2;37m\u001b[1;37mA: You must gain respect and knowledge of this community, if you are noticed for good roleplay you will be contacted about it.\u001b[0m\u001b[2;37m\u001b[0m\n\n\u001b[2;33m\u001b[1;33mQ: How do I join a Department?\u001b[0m\u001b[2;33m\u001b[0m\n\n\u001b[2;37m\u001b[1;37mA: You must apply for a position inside of our Departments channel\u001b[0m\u001b[2;37m\u001b[0m\n\n\u001b[2;33m\u001b[1;33mQ: There is a corrupt staff member, how do I report them?\u001b[0m\u001b[2;33m\u001b[0m\n\n\u001b[2;37m\u001b[1;37mA: Open a Report a Member above this category\n\u001b[0m\u001b[2;37m\u001b[0m\u001b[2;33m\n\u001b[1;33mQ: How do I affiliate with this server?\n\u001b[0m\u001b[2;33m\u001b[0m\n\u001b[2;37m\u001b[1;37mA: You must have at least 100 members and active staff with decent graphics!\u001b[0m\u001b[2;37m\u001b[0m\n\n\u001b[2;33m\u001b[2;33m\u001b[1;33mQ: How can I drive Exotics, Send Media inside of General\u001b[0m\u001b[2;33m\u001b[0m\u001b[2;33m\u001b[0m\n\n\u001b[1;2m\u001b[1;37mA: Server Boost the server or be a VIP\u001b[0m\u001b[0m\n\n\u001b[2;33m\u001b[2;33mQ: How can I become a VIP inside of the server\u001b[0m\u001b[2;33m\u001b[0m\n\n\u001b[1;2m\u001b[1;37mA: Own a ER:LC Related server, whether its a Design, Bot, Roleplay Community and have over 2k members, or be a very known person amongst the community \u001b[0m\u001b[0m\n```")
                .setColor(2829617)
                .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221346265065848842/Artboard_34_copy_3.png?ex=66123e59&is=65ffc959&hm=d165c96baadb63e90a8643efefcb150dfa063d290cf37c040f5ce53d81f141c7&")

            interaction.reply({
                embeds: [faq_embed],
                ephemeral:true
            });
        } else if(interaction.values[0] === "dashboard_shop_afjai12jg92bn2992jd") {
            const shop_embed = new EmbedBuilder()
                .setTitle("‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎ ‎‎‎‎ ‎‎            ‎‎<:Shop:1221352896248156180>   Lonestar Shop")
                .setDescription("```Robux Donations, they do not grant you anything but a discord role, to claim this open a Management Support Ticket```\n<:Robux:1221353298112544778> `500` [**Robux Donation**](https://www.roblox.com/game-pass/754841610)\n<:Robux:1221353298112544778> `200` [**Robux Donation**](https://www.roblox.com/game-pass/756082710)\n<:Robux:1221353298112544778> `100` [**Robux Donation**](https://www.roblox.com/game-pass/757209635)\n\n```Buy a Paid Advertisement for your server, no paying to get infront of the queue, once paid open a Management Support Ticket```\n<:Robux:1221353298112544778> `150` [**Paid Advertisement No Ping**](https://www.roblox.com/game-pass/756273597)\n<:Robux:1221353298112544778> `350` [**Paid Advertisement @ here**](https://www.roblox.com/game-pass/757230621)\n<:Robux:1221353298112544778> `750` [**Paid Advertisement @ everyone**](https://www.roblox.com/game-pass/761167200)")
                .setColor(2829617)
                .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221352732305264750/Artboard_34_copy_5.png?ex=6612445f&is=65ffcf5f&hm=c100843daec4c6962927a4ec2007c1465a6dfe7f9c00e669bc6d5268a957eae9&");

            interaction.reply({
                embeds: [shop_embed],
                ephemeral:true
            });
        }
    }
};