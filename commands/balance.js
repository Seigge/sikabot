const {getBalance} = require ("../Utils.js")
 
exports.run = async(client, message, args) => {
const target = message.mentions.users.first() || message.author;
return message.channel.send(`${target.tag} has ${await getBalance(target.id, message.guild.id)}💰`);
}