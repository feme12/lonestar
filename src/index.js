import { config } from "dotenv";
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
import { CommandKit } from "commandkit";
import noblox from "noblox.js";
import { fileURLToPath } from "url";
import path from "path";
import os from "os-utils";
import { db } from "./database.js";
import {execute as dashboardexec} from"./dropdowns/dashboard.js";
import { set_ticket_number } from "./utils.js";
import { checkblacklist } from "./utils.js";

config();


const client = new Client({
    intents: [Object.keys(GatewayIntentBits)]
});


const __dirname = path.dirname(fileURLToPath(import.meta.url));


const commandkit = new CommandKit({
    client,
    commandsPath: path.join(__dirname, "commands"),
    eventsPath: path.join(__dirname, "events"),
    devUserIds: ["696158716617031711"],
    devGuildIds: ["1203350542911541338"],
    bulkRegister: true
});

const botStartTime = new Date();

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(
      `Watching your orders`,
      {
        type: 4,
      }
    );
  
    const evalcommand = new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluates javascript code (adhdbob only)')
    .setDMPermission(false)
    .addStringOption(option => option.setName('code').setDescription('The code to evaulate').setRequired(true));

    const infocommand = new SlashCommandBuilder()
    .setName('info')
    .setDescription('info about the bot.')
    .setDMPermission(false);
  
    await client.application.commands.create(evalcommand,"1203350542911541338");
    await client.application.commands.create(infocommand,"1203350542911541338");
});


client.on("messageCreate", async (interaction) =>{
  if(interaction.content === "!b ticketpanel") {
    dashboardexec(interaction);
    interaction.delete();
  }
})


client.on("interactionCreate", async (interaction) => {
    if(interaction.isChatInputCommand());
    if (interaction.commandName === "eval") {
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
    };

    if(interaction.commandName === 'info') {


        const random_colors = ['#FF5C5C', '#F79454', '#FFDB5C', '#5CFF9D', '#5C6CFF', '#B75CFF']
        const random = random_colors[Math.floor(Math.random() * random_colors.length)]
        let cpuUsage;
        await new Promise((resolve) => {
            os.cpuUsage((v) => {
                cpuUsage = v;
                resolve();
            });
        });


        const cpuUsagePercentage = (cpuUsage * 100).toFixed(2);
    

        const currentTime = new Date();
        const uptimeDuration = currentTime - botStartTime;
        const uptimeDays = Math.floor(uptimeDuration / (1000 * 60 * 60 * 24));
        const uptimeHours = Math.floor(uptimeDuration / (1000 * 60 * 60));
        const uptimeMinutes = Math.floor((uptimeDuration % (1000 * 60 * 60)) / (1000 * 60));
        

        const guildCount = client.guilds.cache.size;
        const totalMembers = client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
        const commands = await client.application.commands.fetch();
        const totalCommands = commands.size;
    
    
        const embed = new EmbedBuilder()
        .setColor(random)
        .setTitle("Information about the bot.")
        .addFields(
            { name: '<:discordjs:1220391900834566184> Discord.js', value: `**${version}**`, inline: true},
            { name: '<:nodejs:1220390632598802592> Node.js', value: `**${process.version}**`, inline: true},
            { name: '<:cpu:1220390562281164941> CPU Usage', value: `**${cpuUsagePercentage}%**`, inline: true},
            { name: '<:server:1220390507243507772> Servers', value: `**${guildCount} servers**`, inline:true},
            { name: '<:member:1220390449378885642> Users', value: `**${totalMembers} users**`, inline:true},
            { name: '<:slashcommand:1220390387726815304> Commands', value: `**${totalCommands}**`, inline:true},
            { name: '<:ping:1220390317560172635> Ping', value: `**${client.ws.ping} ms**`, inline:true},
            { name: '<:uptime:1220390241341276160> Uptime', value: `**${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m**`, inline:true},
        )
        .setThumbnail("https://media.discordapp.net/attachments/1203356429574996038/1220187187606192139/Artboard_23.png?ex=660e06df&is=65fb91df&hm=a26f2beadf0b86ab33d670ff22d618acf32c8a510a3fef1b00c15fc00c3b68f7&=&format=webp&quality=lossless&width=670&height=670")
        .setFooter({text: 'Made with 💓 by adhdbob#0'})
        interaction.reply({ embeds: [embed] });
    };
});


client.on("interactionCreate", async (interaction) => {
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId === "dashboard_modal_gsa") {
      const reason_for_open = interaction.fields.getTextInputValue("gsa_input1");
      const guild = interaction.guild;
      const user = interaction.user;
      const user_in_guild = guild.members.cache.get(user.id);
      const ticket_catagory = guild.channels.cache.get("1203350544547319870");

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
        .setStyle(ButtonStyle.Danger)
        .setEmoji("<:RCircle:1203452512410144830>")

      const claim_button = new ButtonBuilder()
        .setCustomId("GSA_Claim")
        .setLabel("Claim")
        .setStyle(ButtonStyle.Success)
        .setEmoji("<:GCircle:1203452509142655046>")

      const actionrow = new ActionRowBuilder().addComponents(close_button, claim_button);

      ticket.send({
        embeds:[ticket_embed, ticket_info],
        components: [actionrow]
      });

      interaction.reply({
        embeds: [ticket_opened_embed],
        ephemeral:true
      })
    }
});



client.login(process.env.TOKEN);