exports.run = (client, message, args) => {
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
message.channel.fetchMessages({
 limit: amount
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});
}

exports.settings = {
    aliases:['clr']
}
exports.help = {
    name: 'clear',
    description: 'Clear specified amount of messages from channel, or specified user in this channel',
    botPermission: 'MANAGE_MESSAGES',
    userTextPermission: 'MANAGE_MESSAGES',
    userVoicePermission: '',
    usage: 'clear <optional - Username otherwise all> amount(up to 50)',
    example: [ 'clear 20', 'clear @Sike 20' ]
  };