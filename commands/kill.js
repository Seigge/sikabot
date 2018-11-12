const {removeHp, showHp } = require ("../Utils.js")
exports.run = async(client, message, args) => {
  let target = message.mentions.users.first();

 if(await showHp(message.author.id, message.guild.id) <=0){
  return message.reply('You are dead');
 }
 //let smiles = message.channel.guild.emojis[Math.floor(Math.random()* message.channel.guild.emojis.length)]
 //const smile1 = Math.floor(Math.random()*smiles.length); 
 //const smile2 = Math.floor(Math.random()*smiles.length);
 
let dmg = Math.floor((Math.random()*4)+1);


if (message.mentions.members.size === 0)
   return message.reply("Choose a target");
   await removeHp(target.id, message.guild.id, dmg);
   //:${smiles}:_:${smiles}: ${message.author.username}
   message.channel.send(`${target.username} takes ${dmg} damage and has only ${await showHp(target.id, message.guild.id)} hp left`);
	
}