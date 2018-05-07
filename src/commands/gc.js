exports.run = (client, message, args) => {
	message.channel.fetchMessages({ limit: 10 })
		.then(ms => ms.filter(m => m.author.bot).forEach(m => m.delete().catch(error => error)));
		return Promise.reject();
		
    }
