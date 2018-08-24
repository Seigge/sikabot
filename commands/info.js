exports.run = async(client, message, args) => {
    const {getBalance} = require ("../sikabot.js")
   return  message.reply({embed:{
        fields: [{
            name: 'Name',
            value: `${message.member.user.username}`,
            name: 'Balance',
            value: `${await getBalance(message.author.id,message.guild.id)}`,
            name: 'Avatar',
            value: `${message.member.user.avatarUrl}`
        }]
        
    }})
}