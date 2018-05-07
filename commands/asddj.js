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
    //TODO organize songs in playlist
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
			
            const broadcast = client.createVoiceBroadcast();
            if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
              .then(connection => {
				//const stream = ytdl(song.toString())
			/*	ffmpeg(stream)
				.noVideo()
				 .save(`SAD/${song.length-20}-${(Math.random() * 100000).toFixed(0)}.mp3`)
				 .on('end', function(stdout, stderr) {
                 console.log('Transcoding succeeded !')
				 }) */
			   // broadcast.playStream(stream);
             var dispatcher = connection.playFile('SAD/23-36202.mp3');
				
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
			message.reply('No such subcommand.Use proper subcommand (`${config.prefix}`Play,skip)')

    }
  
	
}