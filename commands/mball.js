var answers = ["Можешь быть уверен в этом","Мне кажется — «да»","Пока не ясно, попробуй снова","По моим данным — «нет»","Даже не думай","Лучше не рассказывать","Определённо да","Бесспорно","Вероятнее всего","Спроси позже","Сконцентрируйся и спроси опять","Перспективы не очень хорошие","Мой ответ — «нет»", "Знаки говорят — «да»","Весьма сомнительно","Сейчас нельзя предсказать"];

exports.run = (client, message, args) => {


    if (args.length <1){
        return Promise.reject(message.reply('Error'));
    }
     let answerID = Math.floor(Math.random() * answers.length);
	 message.channel.send(" - " + answers[answerID]).catch(console.error);
}
