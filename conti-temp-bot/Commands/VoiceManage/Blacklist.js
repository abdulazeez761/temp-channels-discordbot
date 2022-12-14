const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "Blacklist",
  aliases: ["blacklist", "bl", 'band', 'ban'],
  description: "Blacklist user from voice channel",
  usage: "Blacklist <user>",
  ownerOnly: false,
  myServerOnly: false,
  guildOnly: false,
  cooldown: 5,
  run: async (client, message, args) => {

    let channel = message.member.voice.channel;
    if (!channel) return message.channel.send({
      embed: {
        color: "RED",
        description: `Setting channel on your own channel`
      }
    })
    if (!message.member.permissionsIn(channel).has('MANAGE_CHANNELS'))
      return message.inlineReply('⚠ - The channel is owned');

    if (!message.guild.me.permissionsIn(channel).has('MANAGE_CHANNELS'))
      return message.inlineReply('⚠ - I dont have authority to manage');

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.user.id.toLowerCase() === args.join(' ').toLocaleLowerCase())
    let doing = new MessageEmbed()
      .setAuthor("Blacklist Voice", "https://cdn.discordapp.com/emojis/870629127525392424.png?v=1")
      .addField("How to do?", `\`\`\`js
mp!blacklist <mention> | <id> | <username>
\`\`\``)

    let userIsNotInTheRome = new MessageEmbed()
      .setAuthor("Blacklist Voice", "https://cdn.discordapp.com/emojis/870629127525392424.png?v=1")
      .addField("user is not in a chat rome", `\`\`\` user must be in the rome first
\`\`\``)
      .setFooter("Blacklist Statement")
      .setColor('GREEN')
    let userIsNotInYourChannel = new MessageEmbed()
      .setAuthor("Blacklist Voice", "https://cdn.discordapp.com/emojis/870629127525392424.png?v=1")
      .addField("user is not in your chat rome", `\`\`\` user must be in your rome first
\`\`\``)
      .setFooter("Blacklist Statement")
      .setColor('GREEN')

    if (!user) return message.inlineReply(doing);
    if (!user.voice.channel) return message.inlineReply(userIsNotInTheRome);
    if (message.member.voice.channel.id !== user.voice.channel.id) return message.inlineReply(userIsNotInYourChannel);
    if (message.author.id == user.id) return message.inlineReply('you cant kick your self');;
    user.voice.kick()
    channel.updateOverwrite(user, {
      CONNECT: false
    })
    let ngentot = new Discord.MessageEmbed()
      .setTitle("Permission Update")
      .setDescription(`\`🔨\` Now ${user} got banded from [\`${channel.name}\`] by **${message.author.username}**. Tadaa`)
      .setFooter(`© ${message.guild.name} 2021`)
      .setColor("BLACK")
    message.inlineReply(ngentot)


  }
}
//else {
  // if (channel.name !== name) return message.inlineReply("I dont control that channel anymore because the owner of the channel make a miss")
