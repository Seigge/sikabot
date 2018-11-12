exports.run = async(client, message, args) =>{
    const {setHp, buyItem,showHp} = require("../Utils.js")

    const target = message.mentions.users.first() || message.author;

    switch(args[0]){

    case 'heal' :
    const cost = Number([args[1]]);
     if(  (await buyItem(target.id, message.guild.id, cost*1.2)) !== 0){
       await setHp(target.id, message.guild.id,cost )
      return message.channel.send(`Your hp is ${await showHp(target.id, message.guild.id) }`)
    
     } else{
         return message.channel.send('You don\'nt have enough money');
     }
    }
}