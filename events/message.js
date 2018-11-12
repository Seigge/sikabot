module.exports = (client, message) => {
   const {addCoin } = require("../Utils.js");
  
  const handleCommand = require('../handlers/commandHandler');
  
  addCoin(message.author.id, message.guild.id, 0.2, message.author.username);
    // Ignore all bots
  if (message.author.bot) return;
    
  handleCommand(message);
   
   
  }