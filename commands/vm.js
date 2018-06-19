exports.run = async(client, message, args) => {
    
        
            const mutedMember = message.guild.roles.find(r => r.name.toLowerCase() === "muted");
           // const x = Number(args[1]);
        
            if (!mutedMember)
                return console.log("The muted role does not exist");
        
            if (message.mentions.members.size === 0)
                return message.reply("Select a user");
        
            /*if (typeof x !== "number"|| x!== x)
                return message.reply('This is not a number');
            */
                
            const mutedMention = message.mentions.members.first();
            const msg = await message.channel.send(`Voting for muting of ${mutedMention}`); 
            const plus = await  msg.react('✅');
            const minus = await  msg.react('❎');
            const filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id != mutedMention.id;
            const collector = await msg.createReactionCollector(filter, { time: 10000 });

                  collector.on('end',() => {
                      
                    if (plus.count>minus.count) {
                        mutedMention.addRole(mutedMember);
                        message.channel.send(`Vote was successful.Muting ${mutedMention} for 1 minute`)
                        setTimeout(m => mutedMention.removeRole(mutedMember),((1*1000)*60));
                    } else if (plus.count < minus.count || plus.count === minus.count ){
                        message.channel.send('Vote failed')
                    } else {
                      message.channel.send('An error occured')
                    }
                  });

            
}
