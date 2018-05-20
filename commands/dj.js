const queue = new Map ();

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
	var serverQueue =  queue.get(message.guild.id);
	const voiceChannel = message.member.voiceChannel;
	
	switch(args[0]){
		case 'play':
		
		if (!args[1]){
			message.reply('Provide a proper YouTube link')
		};
		if (!voiceChannel){
			message.reply('I\'m sorry,but you need to be in voice channel')
		};
		const songInfo = await ytdl.getInfo(args[1]);
		serverQueue =  queue.get(message.guild.id);
		
		const song = {
			title: songInfo.title ,
			url: songInfo.video_url
		}
		if (!serverQueue){
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
			return message.reply(`✅ **${song.title}** has been added to the queue!`)	
		}	
		return undefined;
		
		case 'skip': 
		serverQueue =  queue.get(message.guild.id);
		if (!voiceChannel) return message.reply("You are not in the voice channel");
		if (!serverQueue) return message.reply("There is nothing to skip");
		serverQueue.connection.dispatcher.end();
		break;

		case 'stop':
		serverQueue =  queue.get(message.guild.id);
		if (!voiceChannel) return message.reply("You are not in the voice channel");
		serverQueue.songs = [];
		serverQueue.connection.disconnect();
		break;

		case 'queue':
		serverQueue =  queue.get(message.guild.id);
		if(!serverQueue.songs) return message.reply("The queue is empty! Add more songs,please");
		message.reply({embed: {
			color: 3447003,
			fields: [{
			 name: "Fields",
			 value: ` ${serverQueue.songs.map(song => `${song.title.join('\n')}`)}`
		  }]
		  
		}})
		break;
	
		case 'volume':
		serverQueue =  queue.get(message.guild.id);
		if (!voiceChannel) return message.reply("You are not in the voice channel");
		if (!serverQueue) return message.reply("The queue is empty.");
		if (!args[1]) return message.reply(`Current volume is : ${serverQueue.volume}`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] /5);
		return message.channel.send(`The volume is changed to ${args[1]}`);

		case 'now':
		serverQueue =  queue.get(message.guild.id);
		if (!serverQueue) return message.reply("There is nothing playing");
		return message.reply(`Now playing: **${serverQueue.songs[0].title}**`);
	}
	function play (guild, song) {
		const serverQueue = queue.get(guild.id);
		if (!song){
		   serverQueue.voiceChannel.leave();
		   queue.delete(guild.id);
		   return;
		}	
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			serverQueue.songs.shift();
			setTimeout(function (){
				play(guild, serverQueue.songs[0]);
			},500);
			
		}) 
		.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(5/5);
		
		serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
	}
	
}