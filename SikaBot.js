const Discord = require("discord.js");
const fs = require("fs");
const { Users } = require('./dbObjects');
const { Op } = require("sequelize");

const currency = new Discord.Collection();

const client = new Discord.Client();

const config = require("./config.json");


const cooldown = new Set();

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

//Hash func for js support
String.prototype.hashCode = function(str) {
    return Math.abs( str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0));
  }

const Modules = require('./handlers/modulesHandler');
client.commands = Modules.commands;
client.aliases = Modules.aliases;
/*

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
*/
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
client.login(config.token);

process.on('unhandledRejection', rejection => {
  
  console.warn('\n[unhandledRejection]');
  console.warn(rejection);
  console.warn('[/unhandledRejection]\n');
});