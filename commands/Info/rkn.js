exports.run = (client, message, args) => {
	
const request = require('request');

  request('https://usher2.club/d1_ipblock.json', function (error, response, body) {
	
    if (!error && response.statusCode == 200) {
        arr = JSON.parse(response.body);
		secondToLast = arr[arr.length-2];
        last = arr[arr.length-1];
        result = last["y"] - secondToLast["y"]
		difference = (result>0) ? "▲" : "▼"
    d = new Date(last["x"]*1000);
    message.reply(`Пока заблокированно: ${last["y"].toLocaleString('ru')} (**${result}**) ${difference}`);
    message.reply("Дата обновления списка заблокированных ресурсов: " + d.toLocaleDateString("ru") + " " + d.toLocaleTimeString("ru"));
    }
})
}

exports.settings = {
	aliases:[''],
	enabled: true
}
exports.help = {
	name: 'rkn',
	description: 'Shows amount of blocked sites by russian RosKomNadzor facility',
	botPermission: '',
	userTextPermission: '',
	userVoicePermission: '',
	usage: 'rkn',
	example: [ '' ]
  };