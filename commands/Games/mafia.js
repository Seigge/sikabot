exports.run = async (client, message, args) => {
  // Checking if a bot is in this guild
  if(!message.guild.available){
    return message.send('Cannot find a guild');
  }
      // Gathering players
      const msg = await message.channel.send(`Создание игры. Для участия нажмите на ✅. Необходимо не менее 3-х человек для старта.`)
      await msg.react('✅')
      const collector = await msg.createReactionCollector(reaction => reaction.emoji.name === '✅', { time: 10000 })
        collector.on('end', () => {
         const players =  collector.users.filter(user => !user.bot)
          if(players.size >= 1 ){
            startGame(players)
           } else {
            return message.reply('Слишком мало игроков. Минимальное количество - 3')
           }
        })

  async function startGame(players) {
    // If there is a channel with name MafiaGame
    if(message.guild.channels.find('name','mafiagame')){
      const mafiaChannel = message.guild.channels.find('name','mafiagame');
      const mafiozoLairChannel = message.guild.channels.find('name','mafiozo-lair');
      
      // Reset permissions 
      mafiaChannel.overwritePermissions(message.guild.roles.find('name','@everyone'), {
        VIEW_CHANNEL:false
      })
      .then(console.log('Channel reseted'));
      
      mafiozoLairChannel.overwritePermissions(message.guild.roles.find('name','@everyone'), {
        VIEW_CHANNEL:false
      })
      .then(console.log('Channel reseted'));

      // Or create channels
    } else {
       message.guild.createChannel('MafiaGame', 'text')
      .then(channel => channel.overwritePermissions(message.guild.roles.find('name','@everyone'), {
        VIEW_CHANNEL:false
      }))
     .catch(error => console.log(`Mafia Error: ${error}`));
     
      message.guild.createChannel('Mafiozo Lair', 'text')
      .then(channel => channel.overwritePermissions(message.guild.roles.find('name','@everyone'), {
        VIEW_CHANNEL: false
      }))
      .catch(error => console.log(`Mafia Error: ${error}`))
     }
     // Set a roles for a players
     let randPlayer = players.filter(player => player.id).array();
     
    }
  }   



exports.settings = {
	aliases:['mafia'],
	enabled: false
}
exports.help = {
    name: 'mafia',
    description: 'Mafia',
    botPermission: 'CONNECT',
    userTextPermission: 'CONNECT',
    userVoicePermission: 'CONNECT',
    usage: 'dj play songname',
    example: [ 'dj play https://www.youtube.com/watch?v=example','dj play thunder' ]
  };