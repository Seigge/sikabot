const {getBalance} = require ("../Utils.js")
 
exports.run = async(client, message, args) => {
	const target = message.mentions.users.first() || message.author;
	if(await getBalance(target, message.guild.id)>10){
		return message.channel.send('Sosi pisu');
	}else{
		return message.channel.send('Ne sosi pisu');
	}
	
		
}
