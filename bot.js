//consts (for glitch)
// GEREKLİ YERLER

const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
// GEREKLİ YERLER

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');

require('./util/eventLoader')(client);



var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};







client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});



client.on("message", message => {
if (message.channel.type == 'dm') message.author.send ('Sunucudan mesaj gönderin.')   

});

///////////////////










client.on("message", message => {
if (message.content.toLowerCase() === '!yardım') {
if (message.channel.type == 'dm') message.author.send ('Sunucudan mesaj gönderin.')   
}
});




//
client.on('message', async message => {
    if (message.content === '!fakegiriş') {
        client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

client.on('message', async message => {
    if (message.content === '!fakeçıkış') {
        client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});
  
  

///emoji
client.on('message', async message => {

let Ell= await db.fetch(`emoci${message.guild.id}`)
let mesaj = await db.fetch(`mesaj${message.guild.id}`)
let mesajlogat = message.guild.channels.find('id', mesaj);

  
if(Ell == 'Kapalı') return;
if(message.channel.id !== mesaj) return;
  
if(Ell == 'Açık') {
if (message.content === `${prefix}emojirolbaşlat`) {
      if(message.author.bot) return; 
      message.channel.bulkDelete(1)
mesajlogat.send(`Kayıt olmak için Aşağıdaki ✅ tepkisine tıklayın.`).then(async function(sentEmbed) { // BU MESAJI DEĞİŞTİREBİLİRSİNİZ

        const emojideistir = ["✅"];
        const filter = (reaction) =>

          emojideistir.includes(reaction.emoji.name)
        await sentEmbed.react(emojideistir[0]).catch(function() {});
              var reactions = sentEmbed.createReactionCollector(filter, {
        });

client.on("messageReactionAdd", async (reaction,user)=>{
    var rol = await db.fetch(`emojirol${message.guild.id}`)
    let rol2 = reaction.message.guild.roles.find('id', rol)
  if(!user) return;
  if(user.bot)return;
  if(!reaction.message.channel.guild) return;

  if(reaction.emoji.name == "✅"){         
    reaction.message.guild.member(user).addRole(rol2).catch(console.error);
  }
});
})
}
}
})


/*
const ms = require('parse-ms')
client.on("message", async msg => {  
const diauyetekst = new Discord.RichEmbed()
.setDescription(`** :gem: Elmas Kod görüntüleyicimiz geldi!!**`)
.setColor("#c987ff")
let zamanasimi = 300000
let dialar = await db.fetch(`cfxz${msg.author.id}`)
let diadb = await db.fetch(`diasure${msg.author.id}`);
if (dialar == 'diamond') {  
if (diadb !== null && zamanasimi - (Date.now() - diadb) > 0) {
let time = ms(zamanasimi - (Date.now() - diadb)); } else {
if(msg.author.bot) return;   
if (msg.content.length > 1) {
db.set(`diasure${msg.author.id}`, Date.now());
msg.channel.send(diauyetekst).then(msg => { msg.delete(10000) })}}}})
*/





 client.login(ayarlar.token);
