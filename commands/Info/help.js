exports.run = async (client, message,args) => {
	
	if (client.commands.has(args.Command)){
		let command = args.Command.toLowerCase();
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
	return message.channel.send('An error occured.');
  }
	

exports.settings = {
	aliases:[''],
	enabled: true,
	argsDefinitions: [
		{name: 'Command', type: String, allias: 'c', defaultOption: true}
	]
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