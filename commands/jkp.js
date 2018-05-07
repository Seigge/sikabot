exports.run = (client, message, args) =>{
    let dice = Math.floor(Math.random()*6);
    let yourDice = Math.floor(Math.random()*6);
    message.reply(`Ваш кубик: ${yourDice+1} Кубик бота ${dice+1}`)
	if(yourDice>dice){
		message.reply('Вы выиграли');
	}else if (yourDice === dice) {
		message.reply('Ничья');
	}else {
		message.reply('Вы проиграли');
	}
}