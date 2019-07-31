exports.run = async (client, message,args) => {
	
	if (client.commands.has(args)){
		
		let command = args
		command = client.commands.get(command);

   return message.channel.send({embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
			title: command.help.name,
			description: command.help.description,
		/*	fields: [{
					name: 'Usage' ,
					value: command.help.usage
				},
				{
					name: 'Example' ,
					value: command.help.example
				},
				{
					name: 'Bot Permissions',
					value: command.help.botPermission
				}
			], */
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL
			}
		}
	});
	}
	return message.channel.send('В разработке.');
  }
	

exports.settings = {
	aliases:['h'],
	enabled: true,
	
}
exports.help = {
	name: 'help',
	description: 'Show this message',
	botPermission: '',
	userTextPermission: '',
	userVoicePermission: '',
	usage: 'help',
	example: [ '' ]
  };