exports.run = (client, message, args) => {
	const x = Number(args[1]);
	var mutedPerson = message.mentions.members.first();
	
if ( !message.author.hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
        return message.reply("You dont have such permissions.");
if (typeof x !== "number"|| x!== x)
       return message.reply('This is not a number');
   
    message.channel.overwritePermissions(mutedPerson, {
  SEND_MESSAGES: false
})
 setTimeout(m => message.channel.overwritePermissions(mutedPerson, {
  SEND_MESSAGES: true ,((args[1]*1000)*60));
}
