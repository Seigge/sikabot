exports.run = async(client, message, args) => {
   const request = require ('request');
   const username = args[0];
   let arr; 
   let info; 
   

   request(`https://r6tab.com/api/search.php?platform=uplay&search=${username}`, async function(err, response){
       if(!err && response.statusCode === 200) {
            arr = await JSON.parse(response.body);
            request(`https://r6tab.com/api/player.php?p_id=${arr.results[0].p_id}`, function(err,response)
            {
             if(!err && response.statusCode === 200){
                 info = JSON.parse(response.body);
                 return  message.channel.send({embed: {
                    color: 3447003,
                    author: {
                        name: `${arr.results[0].p_name}` ,
                        icon_url: `https://ubisoft-avatars.akamaized.net/${arr.results[0].p_user}/default_146_146.png `
                    },
                    title: `Info about ${username}`,
                    fields: [
                    {
                        name: 'Level',
                        value: `${arr.results[0].p_level}`
                    },
                    {
                        name: 'KDA',
                        value: `${(parseFloat(info.kd)*0.01).toFixed(2)}`
                    },
                    {
                        name: 'Total Ranked Matches ',
                        value: `${info.data[3]+info.data[4]}`,
                        inline: true
                    },
                    {
                        name: 'Total Casual Matches',
                        value: `${info.data[8]+info.data[9]}`,
                        inline: true
                    },
                    {
                        name: 'Total Bullets',
                        value: `${info.data[16]}`
                        
                    },
                    {
                        name: 'Total Melees',
                        value: `${info.data[18]}`,
                        inline: true
                    },
                    {
                        name: 'Total Suicides',
                        value: `${info.data[20]}`,
                        inline: true
                    }]
                }})  
             } else {
                 return message.reply('An error occured');
             }
           });
       } else {
           return message.reply('An error occured.');
       }
       
   })
   

  
   
}
exports.settings = {
    aliases:['r6'],
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