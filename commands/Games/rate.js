exports.run = (client, message, args) => {
    if(args.length<1)return message.reply('Input phrase');
    var phrase = args.Phrase;
    return message.reply(`${phrase} - ${Math.floor((Math.random()*10)+1)}/10`)
}

exports.settings = {
	aliases:['rt'],
	argsDefinitions: [
		{name: 'Phrase', type: String, defaultOption: true}
],
	enabled: true
}
exports.help = {
	name: 'rate',
	description: 'Rates the phrase from 1 to 10',
	botPermission: '',
	userTextPermission: '',
	userVoicePermission: '',
	usage: 'rate',
	example: [ '' ]
  };