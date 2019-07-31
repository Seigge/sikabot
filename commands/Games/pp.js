exports.run = async(client, message, args) => {
   let phrase = args.join(' ');
   let percent = (Math.random()*100).toFixed(2);
    message.channel.send(`${phrase} - ${percent}%`)
}

exports.settings = {
    aliases:['percent']
}
exports.help = {
    name: 'pp',
    description: 'Get a percentage of some thing.',
    botPermission: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: 'pp thing',
    example: [ 'pp percentage of users with ps4' ]
  };