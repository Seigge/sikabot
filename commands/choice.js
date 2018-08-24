exports.run = (client, message, args) => {
	 if ( args.length <= 1)
	return message.channel.send("Error")
     let answ = Math.floor(Math.random()*args.length);
	 return message.channel.send(args[answ]).catch(console.error);
	 
}