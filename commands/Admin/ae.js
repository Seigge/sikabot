exports.run = async (client, message, args) => {
 const emojiPath = args[0];
 const emojiName = args[1];
 if (emojiName == null || emojiPath == null ) return message.reply('Fill out necessary fields.')

 if ( !message.member.hasPermission("ADMINISTRATOR")|| !message.member.hasPermission("MANAGE_GUILD"))
        return message.reply("You dont have such permissions.");
   
// if(!message.author.hasPermission("MANAGE_GUILD")||!message.author.hasPermission("ADMINISTRATOR"))
//         return message.reply("I can't do this.")

 message.member.guild.createEmoji(emojiPath, emojiName).then(() => {
    message.reply(`Added an emoji ${emojiName}`)
    .then(() =>
     message.delete())
     .catch(console.log);
 });

}

exports.settings = {
    aliases:['ae']
}
exports.help = {
    name: 'AddEmoji',
    description: 'Add the picture provided with a link as emoji',
    botPermission: 'MANAGE_EMOJIS',
    userTextPermission: 'MANAGE_EMOJIS',
    userVoicePermission: '',
    usage: 'addemoji <Emoji url>',
    example: [ 'addemoji https://exampleemoji.com/emoji.jpg' ]
  };