exports.run  = (client, message, args) => {
	const member = message.mentions.members.first();
	if (message.author.id != config.ownerID) return message.reply("You dont have permissions to do this.");
	if (args.length <1) return Promise.reject();
	member.kick();
}