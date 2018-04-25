exports.run = (client, message, args) => {
 message.channel.send({embed: {
  color: 3447003,
  fields: [{
        name: "Mball",
        value: "Gives random answer on your question"
      },
      {
        name: "Choice",
        value: "Gets 1 item from the message"
      },
      {
        name: "Gc",
        value: "Clears last 50 bot mesages"
      },
      {
		name: "Kill",
		value: "Deal random damage to @mention"	
	  }
    ]
}});
}