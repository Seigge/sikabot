exports.run = (client, message, args) => {
 const fs = require ('fs');
 var helpCommands = '';
 fs.readdir("./commands/",(err, files) => {
	if (err) return console.error(err);
	
	files.forEach(file => {
    helpCommands += file.split(".js").join("\n")
	
 })
})
}

exports.settings = {
	aliases:[''],
	enabled: true
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