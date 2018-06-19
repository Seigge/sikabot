//require ("../sikabot.js")
exports.run = (client, message, args) => {
   
 console.log(currency);
const target = message.mentions.members.first() || message.author;
return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
}
function getBalance(id){
    const user = currency.get(id);
    return user ? user.balance : 0;
  };