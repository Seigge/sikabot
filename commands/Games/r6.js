exports.run = async(client, message) => {
   const request = require ('request');
   
   let username = '';
   let platform = '';

   let endpoint = 'http://api.r6stats.com'

   request.get()

}
exports.settings = {
    aliases:[''],
    enabled:false
}
exports.help = {
    name: 'Rsix',
    description: 'Add the picture provided with a link as emoji',
    botPermission: 'MANAGE_EMOJIS',
    userTextPermission: 'MANAGE_EMOJIS',
    userVoicePermission: '',
    usage: 'addemoji <Emoji url>',
    example: [ 'addemoji https://exampleemoji.com/emoji.jpg' ]
  };