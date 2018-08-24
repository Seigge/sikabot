const { Users } = require('./dbObjects');
const { Op } = require("sequelize");
//const {}
async function addCoin(id, guildId, amount){
    try {
    const user = await Users.findOne({ where: {user_id: id, guild_id: guildId }});
      if(user){
        user.balance += Number(amount);
       return user.save();
      }
      const newUser = await Users.create({user_id: id,  guild_id: guildId, balance: amount, hitpoints: 20 })
    } catch(e){
      console.log(e)
    }
    };
  
    async function getBalance(id, guildId){
      try {
   const userB = await Users.findOne({ where:{user_id: id, guild_id: guildId }});
   return userB ? Math.round(userB.balance) : 0;
    } catch(e) {
      console.log(e)
    }
  }
  
  async function removeHp(id, guildId, amount){
    try
    {
      const user = await Users.findOne({ where: {user_id: id, guild_id: guildId }});
      if(user){
        if(user.hitpoints >= amount){
          user.hitpoints = user.hitpoints - Number(amount);
          user.save();
        }else {
          user.hitpoints = 0;
          user.save();
        }
      } else {
        const newUser = await Users.create({user_id: id,  guild_id: guildId, hitpoints:20 })
    
      }
    }catch(e){
      console.log(e)
    }
  }
  async function setHp(id, guildId, amount){
    try {
      const user = await Users.findOne({ where: {user_id: id, guild_id: guildId }});
      if(user){ 
        user.hitpoints = user.hitpoints + Number(amount);
        user.save();
      }
    }catch(e){
      console.log(e);
    }
  }
  async function showHp(id, guildId){
    try {
      const user = await Users.findOne({ where: {user_id: id, guild_id: guildId }});
      if(user){ 
        return user.hitpoints;
      }
    }catch(e){
      console.log(e);
    }
  }

  async function buyItem(id, guildId, cost ){
      try {
        const user = await Users.findOne({ where: {user_id: id, guild_id: guildId }});
        if(user){
            if(user.balance >=cost){
            user.balance = user.balance - Number(cost);
            user.save();
            }else{
                return 0 ;
            }
        }else{
            return 0 ;
        }
      } catch (e) {
          console.log(e);
      }
  }
  module.exports = {
    addCoin : addCoin,
    getBalance: getBalance,
    removeHp: removeHp,
    showHp: showHp,
    buyItem: buyItem,
    setHp: setHp 
}
    