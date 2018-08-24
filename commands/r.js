exports.run = (client, message, args) => {
	if(args.length<1)return message.reply('Input phrase');
	var phrase = args.join(" ");
	var membersGuild = message.channel.guild.members.filter(p=>p.presence.status ==='online')
	 membersGuild = membersGuild.map(m=>m.displayName)
	let answ = Math.floor(Math.random()*membersGuild.length);
	return message.reply(`${phrase} - ${membersGuild[answ]}`);	
}