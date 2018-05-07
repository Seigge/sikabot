exports.run = (client, message, args) => {
	if (
    message.guild.createRole({
        name: 'BOT',
        color: 'Red',
        hoist: true,
        permissions: ["ADMINISTRATOR"]

    });
}