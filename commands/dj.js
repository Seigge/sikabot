const queue = new Map ();
const Util = require('discord.js');
const youTube = require('simple-youtube-api');

const ytdl = require('ytdl-core');
const opus = require('opusscript');
const ffmpeg   = require('fluent-ffmpeg');

exports.run = async (client,message,args) => {
    const youtube = new youTube(client.config.YOTUBE_API_KEY);
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const searchString = args.slice(1).join(' ');
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

		if(url.match(/^https:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			
			for (const video of Object.values(videos)){
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, message, voiceChannel, true)
			}
			return message.channel.guild.send(`Playlist **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url)
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString,1);
					var video = await youtube.getVideoByID(videos[0].id)
				} catch (err) {
					return message.channel.send('Unable to obtain any search results.');
				}
			}
			return handleVideo(video, message,voiceChannel);
		}
		break;
		
		case 'skip': 
		serverQueue = queue.get(message.guild.id);
		if (!voiceChannel) return message.reply("You are not in the voice channel");
		if (!serverQueue) return message.reply("There is nothing to skip");
		const msg = await message.channel.send(`*Voting for skipping of ${serverQueue.songs[0].title}*`); 
		const plus = await  msg.react('✅');
		const minus = await  msg.react('❎');
		const filter = (reaction) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎');
		const collector = await msg.createReactionCollector(filter, { time: 10000 });

			  collector.on('end',() => {
				if ((plus.count>minus.count)) {
					serverQueue.connection.dispatcher.end();
				} else if (plus.count < minus.count || plus.count == minus.count ){
					message.channel.send('Vote failed')
				} else {
				  message.channel.send('Vote failed or error occured')
				}
			  });
		
		break;

		case 'stop':
		serverQueue = queue.get(message.guild.id);
		if (!voiceChannel) return message.reply("You are not in the voice channel");
		serverQueue.songs = [];
		serverQueue.connection.disconnect();
		break;

		case 'queue':
		serverQueue = queue.get(message.guild.id);
		if(!serverQueue.songs) return message.reply("The queue is empty! Add more songs,please");
		message.reply(
			`${serverQueue.songs.map(song => `${song.title}`).join('\n')} `)
		break;
	
		case 'volume':
		serverQueue = queue.get(message.guild.id);
		if (!voiceChannel) return message.reply("You are not in the voice channel");
		if (!serverQueue) return message.reply("The queue is empty.");
		if (!args[1]) return message.reply(`Current volume is : ${serverQueue.volume}`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] /5);
		return message.channel.send(`The volume is changed to ${args[1]}`);

		case 'now':
		serverQueue = queue.get(message.guild.id);
		if (!serverQueue) return message.reply("There is nothing playing");
		return message.reply(`Now playing: **${serverQueue.songs[0].title}**`);
	}
	async function handleVideo(video, message, voiceChannel, playlist = false){
		const serverQueue = queue.get(message.guild.id);
		const song = {
			id: video.id ,
			title: Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`
		}
		if (!serverQueue){
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 2,
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
			if(playlist){ return undefined
			} else {
				return message.reply(`✅ **${song.title}** has been added to the queue!`)
			}
		}	
		return undefined;
	}

	function play (guild, song) {
		const serverQueue = queue.get(guild.id);
		if (!song){
		   serverQueue.voiceChannel.leave();
		   queue.delete(guild.id);
		   return;
		}	
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url,  {filter: 'audioonly', passes: 3, highWaterMark: 1024*1024*10 }))
		.on('end', () => {
			serverQueue.songs.shift();
			setTimeout(function (){
				play(guild, serverQueue.songs[0]);
			},500);
			
		}) 
		.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume/5);
		
		serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
	}
	
}