const fs = require('fs');
const { Collection } = require('discord.js');
const path = require('path');

let Commands = new Collection();
let Aliases = new Collection();

let modules = fs.readdirSync('./commands/').filter(file=>fs.statSync(path.join('./commands/',file)).isDirectory())

for(let module of modules){
    console.log(`Loading ${module} module... \n`);

    let commandFiles = fs.readdirSync(path.resolve(`./commands/${module}`)).
    filter(file => !fs.statSync(path.resolve('./commands/', module, file)).isDirectory()).
    filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
        file = file.substr(0, file.length - 3);
        console.log(`Loading ${file} command...\n`);
        
        file = require('../commands/'+module+'/'+file);

        Commands.set(file.help.name.toLowerCase(), file);

        file.settings.module = module;
        
        for(let alias of file.settings.aliases){
            Aliases.set(alias.toLowerCase(),file.help.name)
        }
    }
    }
   


exports.commands = Commands;
exports.aliases = Aliases;    
