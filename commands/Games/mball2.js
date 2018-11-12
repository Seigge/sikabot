var answers = ["Можешь быть уверен в этом","Мне кажется — «да»","Пока не ясно, попробуй снова","По моим данным — «нет»","Даже не думай","Лучше не рассказывать","Определённо да","Бесспорно","Вероятнее всего","Спроси позже","Сконцентрируйся и спроси опять","Перспективы не очень хорошие","Мой ответ — «нет»", "Знаки говорят — «да»","Весьма сомнительно","Сейчас нельзя предсказать"];

exports.run = (client, message, args) => {
    var hours = new Date().getUTCHours();

var id = (String.prototype.hashCode(message.content)+hours+String.prototype.hashCode(message.channel.name))%answers.length;

    if (args.length <1){
        return Promise.reject(message.reply('Error'));
    }
    if( id>15 ||id<=0){
        id = 4;
    }
     let answerID = id-1;
	 message.channel.send(" - " + answers[answerID]).catch(console.error);
}

exports.settings = {
	aliases:['mball2'],
	enabled: true
}
exports.help = {
	name: 'mball',
	description: 'Gives an aswer in a 8-ball like style with memorizing the answer for user.',
	botPermission: '',
	userTextPermission: '',
	userVoicePermission: '',
	usage: 'mball question',
	example: ['mball is Sike a good programmer?']
  };