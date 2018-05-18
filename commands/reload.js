exports.run = (client, message, args) => {
  if(!args || args.size < 1 || !message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("And error occured");
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`Команда ${args[0]} обновлена`);
};