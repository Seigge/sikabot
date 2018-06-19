exports.run = async(clients,message,args) =>
{   
    const mutedMember = message.guild.roles.find(r => r.name.toLowerCase() === "muted");
    const x = Number(args[1]);

    if (!mutedMember)
        return console.log("The muted role does not exist");
	
	 
    if ( !message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
        return message.reply("You dont have such permissions.");

    if (message.mentions.members.size === 0)
        return message.reply("Select a user");

    if (typeof x !== "number"|| x!== x)
        return message.reply('This is not a number');
    
        
    const mutedMention = message.mentions.members.first();

    mutedMention.addRole(mutedMember);
    setTimeout(m => mutedMention.removeRole(mutedMember),((args[1]*1000)*60));
}