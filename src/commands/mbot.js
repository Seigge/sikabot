exports.run = (client, message, args) => {
    const ayy = client.emojis.find("name", "oldsika");
    message.reply(`Neos руина ${ayy}`);
}
