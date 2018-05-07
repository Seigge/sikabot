exports.run = (client, message, args) => {
		const memUsage = process.memoryUsage();
		bytes = require ('bytes');
		
		return new Promise((resolve,reject) => {
			resolve(Object.keys(memUsage).map(p => p + ': ' + bytes(memUsage[p])).join('\n'))
			});
		
}
