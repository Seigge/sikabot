exports.run = (client, message, args) => {
 const emojiPath = args[0];
 const emojiName = args[1];
 if (emojiName == null || emojiPath == null ) return message.reply('Fill out necessary fields.')
 if ( !message.member.hasPermission("ADMINISTRATOR")|| !message.member.hasPermission("MANAGE_GUILD"))
        return message.reply("You dont have such permissions.");
 message.member.guild.createEmoji(emojiPath, emojiName).then(() => {
    message.reply(`Added an emoji ${emojiName}`)
    .then(() =>
     message.delete())
 });

}