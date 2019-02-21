module.exports = async message => {
    const config = require("../config.json");
    const parseArgs = require ("command-line-args");
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    let cmd;


    if (message.content.indexOf(config.prefix) !== 0) return;
    
    if(message.client.commands.has(command)){
        cmd = message.client.commands.get(command);
    }
    else if (message.client.aliases.has(command)){
        cmd = message.client.commands.get(message.client.aliases.get(command).toLowerCase())
    }
    else return;


  //  let mdl = cmd.config.module;

    cmd.run(message.client, message, parseArgs(cmd.settings.argsDefinitions, { argv: args, partial:true}));
}