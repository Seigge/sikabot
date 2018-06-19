exports.run = (client, message, args) => {
 const fs = require ('fs');
 var helpCommands = '';
 fs.readdir("./commands/",(err, files) => {
	if (err) return console.error(err);
	
	files.forEach(file => {
    helpCommands += file.split(".js").join("/n")
	
 })
 message.reply({embed: {
        color: 3447003,
        fields: [{
         name: "List of all commands",
         value: ` ${helpCommands}`
      }]
	  
    }})
})

}
