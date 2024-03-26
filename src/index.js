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
import moment from "moment";
import discordTranscripts from "discord-html-transcripts";
import {transcript_channel_id, staff_role_id_1, staff_role_id_2, staff_role_id_3, gsa_catagory_id, ms_catagory_id, as_catagory_id, ram_catagory_id, ds_catagory_id} from "./config.js";

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

client.on("interactionCreate", async (interaction) =>{
  if(interaction.isMessageComponent())
  if(interaction.customId === "GSA_Close") {
    const confirm_button = new ButtonBuilder()
      .setCustomId("GSA_Confirm")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("<:RTicket:1203452513970552922>")
    
    const actionrow = new ActionRowBuilder().addComponents(confirm_button);

    interaction.reply({content:"Are you sure you want to close this ticket?", components:[actionrow], ephemeral:true})
  };
  if(interaction.customId === "GSA_Confirm") {
    const data = await db.get(interaction.channel.name)
    const transcript_channel = interaction.guild.channels.cache.get(transcript_channel_id);
    const creator = data.owner;
    const current_time = new moment.utc();

    const unix = current_time.unix()
    const close_embed = new EmbedBuilder()
      .setTitle(" ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ <:RTicket:1203452513970552922> ‎‎ ‎‎Ticket Closed")
      .setFields(
        {name:"Closed By", value:"<@"+interaction.user.id+">", inline:true},
        {name:"Date", value:"<t:"+unix+":d>", inline:true},
        {name:"Creator", value:'<@'+creator+'>', inline:true},
        {name:"Ticket Name", value:interaction.channel.name, inline:true}
      )
    console.log(creator);
    const attachment = await discordTranscripts.createTranscript(interaction.channel, {
      limit: -1,
      returnType: 'attachment',
      filename: interaction.channel.name+"-transcript.html",
      saveImages: true,
      footerText: "Exported {number} message{s}",
      poweredBy: false,
      ssr: true
    });
    
    interaction.channel.send({embeds:[close_embed]});
    interaction.channel.send({files:[attachment]});
    transcript_channel.send({embeds:[close_embed], files:[attachment]});

    try {
      const user = interaction.guild.members.cache.get(creator);

      user.user.send({embeds:[close_embed]});
      user.user.send({files:[attachment]});
    } catch (e) {
      // console.log(e);
    }

    setTimeout(() => {
      interaction.channel.delete();
    },1000)
  }
  if(interaction.customId === "GSA_Claim") {

    const user_in_guild = interaction.guild.members.cache.get(interaction.user.id);

    const data = await db.get(interaction.channel.name);

    const claimedby = data.claimedby;

    const creator = data.owner;

    if(claimedby === null) {
      if(user_in_guild.roles.cache.has(staff_role_id_1) || user_in_guild.roles.cache.has(staff_role_id_2) || user_in_guild.roles.cache.has(staff_role_id_3)) {
        data.claimedby == interaction.user.id;

        await db.set(interaction.channel.name, data);
        const embed = new EmbedBuilder()
          .setTitle(" ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ <:GTicket:1203452516868689934> ‎‎ ‎‎Ticket Claimed")
          .setDescription("**Your ticket will be handled by:** <@"+interaction.user.id+">")
          .setColor(12077385)
          .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221382143989776464/Artboard_34_copy_6.png?ex=66125fc3&is=65ffeac3&hm=07c103f64db6d97f439463a9deb256a7d6e03d724682344b9e8fd04bd7fa05c3&");

        interaction.reply({embeds:[embed]});
        
        const data = await db.get(interaction.channel.name);

        console.log(data);
      }
    } else if(claimedby === interaction.user.id) {
      data.claimedby == null

      await db.set(interaction.channel.name, data);
      const embed = new EmbedBuilder()
          .setTitle(" ‎‎ ‎‎ ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎ ‎‎ <:RTicket:1203452513970552922> ‎‎ ‎‎Ticket UnClaimed")
          .setDescription("**Your ticket was unclaimed please wait while someone else claims it**")
          .setColor(12077385)
          .setImage("https://cdn.discordapp.com/attachments/1203356429574996038/1221382143989776464/Artboard_34_copy_6.png?ex=66125fc3&is=65ffeac3&hm=07c103f64db6d97f439463a9deb256a7d6e03d724682344b9e8fd04bd7fa05c3&");

      interaction.reply({embeds:[embed]});

      const data = await db.get(interaction.channel.name);

      console.log(data);
    }
  }
})


client.login(process.env.TOKEN);