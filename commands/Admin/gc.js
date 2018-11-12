exports.run = (client, message, args) => {
	const config = require("../../config.json");
	
	if (message.author.id != config.ownerID) return message.reply("You dont have permissions to do this.");
	message.channel.fetchMessages({ limit: 10 })
		.then(ms => ms.filter(m => m.author.bot).forEach(m => m.delete().catch(error => error)));
		return Promise.reject();
		
	}
	
	exports.settings = {
		aliases:['gcollect'],
		enabled: true
	}
	exports.help = {
		name: 'gc',
		description: 'Clears bot messages (10)',
		botPermission: 'MANAGE_MESSAGES',
		userTextPermission: 'ADMINISTRATOR',
		userVoicePermission: '',
		usage: 'gc',
		example: [ '' ]
	  };