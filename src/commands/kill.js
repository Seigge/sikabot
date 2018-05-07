exports.run = (client, message, args) => {
	
    let dmg = Math.floor(Math.random()*300);
	let target = message.mentions.members.first;
	if (message.mentions.members.size === 0)
        return message.reply("Укажите пользователя");
	
	 message.channel.send(message.author.username +" наносит вам "+ dmg + " урона " +" "+ args[0]);
		
}