module.exports = async (client) => {
        client.user.setActivity(`Type ${client.config.prefix}help`);
    console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);

}