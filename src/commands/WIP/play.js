exports.run = (client, message, args) => {
   var v = message.guild.channels.filter(g => g.type == "voice")
   v = v.map(g=>`${ g.name} ${ g.id}`);
    console.log(v);
}