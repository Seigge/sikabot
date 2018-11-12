exports.run =  (client,message,args) => {
    if (message.author.id != config.ownerID) return message.reply("You dont have permissions to do this.");
    message.guild.leave();
}