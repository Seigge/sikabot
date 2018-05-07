exports.run = (client,message,args) => {
	channel.createInvite({
		maxAge : 0,
		unique : true
	})
	.then(invite => console.log(`Created an invite with a code of ${invite.code}`))
    .catch(console.error);
}