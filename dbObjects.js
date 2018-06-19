const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Users = sequelize.import('dbModels/Users');
const Shop = sequelize.import('dbModels/Shop');
const Inventory = sequelize.import('dbModels/Inventory');

Inventory.belongsTo(Shop, { foreignKey: 'item_id', as: 'item' });

Users.prototype.addItem = async function(item) {
    const userItem = await Inventory.findOne({
        where: { user_id: this.user_id, item_id: item.id },
    });

    if (userItem) {
        userItem.amount += 1;
        return userItem.save();
    }

    return Inventory.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

Users.prototype.getItems = function() {
    return UserItems.findAll({
        where: { user_id: this.user_id },
        include: ['item'],
    });
};

module.exports = { Users, Shop, Inventory };