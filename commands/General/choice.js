exports.run = (client, message, args) => {
	 if ( (message.content).length <= 1)
	return message.channel.send("Provide two or more expressions");

	 let choices = message.content.slice(client.config.prefix.length+6).trim().split(/\/+/g);
     let answ = Math.floor(Math.random()*choices.length);
	return message.channel.send(choices[answ]).catch(console.error); 
	 
}
exports.settings = {
    aliases:['ch','c']
}
exports.help = {
    name: 'choice',
    description: 'Choose one of the variants, variants is separated by a /.',
    botPermission: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: 'choice variant1/variant2/variant3/variant n',
    example: [ 'choice cofee/tea' ]
  };