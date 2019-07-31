const {findWeight} = require ("../../Utils.js")

exports.run = async (client, message, args) => {
	if(args.length<1)return message.reply('Input phrase');
	 var phrase = args.join(' ');
	 var memberGuild = await findWeight(message.guild.id, 4);
	     memberGuild = memberGuild.map(m=>m.displayName);

	 let answ = Math.floor(Math.random()*memberGuild.length);
    return message.reply(`${phrase} - ${memberGuild[answ]}`);

}

exports.settings = {
    aliases:['roll']
}
exports.help = {
    name: 'r',
    description: 'Get random active user.',
    botPermission: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: 'r message',
    example: [ 'r handsome boy' ]
  };