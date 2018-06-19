const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const currency = new Discord.Collection();
const { Users, Shop } = require('./dbObjects')
const { Op } = require('sequelize');

module.exports = { 
  currency,Users,Shop };

const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;


Reflect.defineProperty(currency, 'add',{
  value: async function add(id, amount){
     const user = currency.get(id);
     if(user){
       user.balance += Number(amount);
       return user.save();
     }
     const newUser = await Users.create({ user_id: id, balance: amount})
     currency.set(id, newUser)
     return newUser;
 },
 });
      Reflect.defineProperty(currency, 'getBalance', {
        value: function getBalance(id){
          const user = currency.get(id);
          return user ? user.balance : 0;
        },
      });


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

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

client.login(config.token);