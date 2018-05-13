exports.run = (client,message,args) => {
    const ytdl = require('ytdl-core');
	const opus = require('opusscript');
	const ffmpeg   = require('fluent-ffmpeg');
    if (!message.guild) return;
    if (!message.guild.available) console.error('No such guild is available');
    if (args.length<1){
        message.reply('Specify subcommand')
        return;

    }
	var playList = [];
    //TODO organize songs in playlist
 const broadcast = client.createVoiceBroadcast();
 broadcast.on("end", () => { 
	broadcast.destroy();
	message.member.voiceChannel.leave();
	 console.log("Destroyed!");
  });
    switch (args[0]) {
        case 'initialise':
           message.guild.createChannel (`SikaBotDjChannel` , 'voice', [{
                id: message.guild.id,
                deny: ['SPEAK'],
                alow: ['CONNECT']
                }])
			  .then()		
              .catch(console.error);
		       break; //TODO create a singleton of channel

        case 'play':
            let song = args[1];
            if (args[1] == null) message.reply('Insert a song here');
            if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
              .then(connection => {
				const stream = ytdl(song.toString())
			    broadcast.playStream(stream);
             const dispatcher = connection.playStream(stream).setVolume(0.2);
				
				
              })
              .catch(console.log);
            } else {
             message.reply('You need to join a voice channel first!');
            } 
            break;
        case 'pause': //todo skip songs 
            dispatcher.pause();
	        break;
		default : 
			message.reply('No such subcommand.Use proper subcommand (`${config.prefix}`Play)')

    }
  
	
}