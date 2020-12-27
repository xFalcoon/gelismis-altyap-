const Discord = require('discord.js');

const config = require("../config.json")
exports.run = (client,message,args) => {

if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send(config.admınıstrator)


let user = message.mentions.users.first()
if(!user) return message.channel.send(config.user)
  
let args = args.slice(1).join(' ')
if(!args) return message.channel.send('Neden banlayacaksın?')


  message.channel.send(`${user} adlı kişi başarıyla banlandı.`)
message.guild.members.get(user.id).ban(args)
}


exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0,
}


exports.help = {
    name: "ban"
}