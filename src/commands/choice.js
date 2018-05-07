exports.run = (client, message, args) => {
	 if ( args.length <= 1){
	 message.channel.send("Error")
	 }else{
     let answ = Math.floor(Math.random()*args.length);
	 message.channel.send(args[answ]).catch(console.error);
	 }
}