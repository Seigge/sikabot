exports.run = (client, message, args) => {
	if(args.length<1)message.reply('Input phrase');
	var phrase = args.join(" ");
	var membersGuild = message.channel.guild.members.map(m=>m.displayName)
	let answ = Math.floor(Math.random()*membersGuild.length);
	message.reply(`${phrase} - ${membersGuild[answ]}`);	
}