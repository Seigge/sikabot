exports.run = (client) => {
        client.user.setActivity(`derping`);
    console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
}