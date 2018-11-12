const {getBalance} = require ("../../Utils.js")
 
exports.run = async(client, message, args) => {
const target = message.mentions.users.first() || message.author;
return message.channel.send(`${target.tag} has ${await getBalance(target.id, message.guild.id)}💰`);
}

exports.settings = {
    aliases:['bal']
}
exports.help = {
    name: 'balance',
    description: 'Get a total current quantity of SikaCoins of the selected user, or author if no one selected.',
    botPermission: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: 'balance @usermention',
    example: [ 'balance @sike' ]
  };