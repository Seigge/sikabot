exports.run = (client, message, args) => {
	var request = require('request');
  request('https://usher2.club/d1_ipblock.json', function (error, response, body) {
	
    if (!error && response.statusCode == 200) {
        arr = JSON.parse(response.body);
		secondToLast = arr[arr.length-2];
        last = arr[arr.length-1];
		console.log(last["y"] - secondToLast["y"])
    d = new Date(last["x"]*1000);
    message.reply("Пока заблокированно: " + last["y"].toLocaleString('ru'));
    message.reply("Дата обновления списка заблокированных ресурсов: " + d.toLocaleDateString("ru") + " " + d.toLocaleTimeString("ru"));
    }
})
}