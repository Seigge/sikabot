exports.run = async (client,message,args) => {
    const ytdl = require('ytdl-core');
	const opus = require('opusscript');
	const ffmpeg   = require('fluent-ffmpeg');
	
    if (!message.guild) return;
    if (!message.guild.available) console.error('No such guild is available');
    if (!args[0]){ 
	message.reply('Specify subcommand'); 
        return ;
    }
	const queue = new Map ();
	const voiceChannel = message.member.voiceChannel;
	switch(args[0]){
		case 'play':
		
		const serverQueue = queue.get(message.guild.id);
		if (!args[1]){
			message.reply('Provide a proper YouTube link')
		};
		
		const songInfo = await ytdl.getInfo(args[1]);
		const song = {
			title: songInfo.title ,
			url: songInfo.video_url
		}
		if(!serverQueue){
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};
			queue.set(message.guild.id, queueConstruct);
			
			queueConstruct.songs.push(song);
			message.reply(`✅**${song.title}** has been added to the queue!`)
			try {
			   var connection = await voiceChannel.join()
			   queueConstruct.connection = connection;
			   play(message.guild, queueConstruct.songs[0]);
		    } catch(error) {
				console.error("Smthing is wrong " + error);
				queue.delete(message.guild.id);
				voiceChannel.leave();
				return message.reply("An error occured.")
			}
		} else {
			serverQueue.songs.push(song);
			return message.reply(`✅**${song.title}** has been added to the queue!`)	
		}	
		return undefined;
		break;

		case 'skip': 
		if(!serverQueue) return message.reply("There is nothing to skip");
		serverQueue.connection.dispatcher.end();
		break;
	}
	function play (guild, song) {
		const serverQueue = queue.get(message.guild.id);
		
		if(!song){
		   serverQueue.voiceChannel.leave();
		   queue.delete(guild.id);
		   return;
		}	
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0])
		})
		.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(5/5);
	}
	
}