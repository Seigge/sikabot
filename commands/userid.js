
exports.run = (client, message, args) => {
	const member = message.mentions.members.first();
	message.channel.send(member.id);
}