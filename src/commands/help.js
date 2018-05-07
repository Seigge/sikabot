exports.run = (client, message, args) => {
 const fs = require ('fs');
 var helpCommands = '';
 fs.readdir("./commands/",(err, files) => {
	if (err) return console.error(err);
	
	files.forEach(file => {
    helpCommands += file.split(".js").join(" ")
	
 })
 message.reply({embed: {
        color: 3447003,
        fields: [{
         name: "Fields",
         value: ` ${helpCommands}`
      }]
	  
    }})
})
console.log(helpCommands);


}
