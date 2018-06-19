const Sequelize = require('sequelize');

const sequelize = new Sequelize('database','username','password',{
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});

const Shop = sequelize.import('dbModels/Shop');
sequelize.import('dbModels/Users');
sequelize.import('dbModels/Inventory');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async() =>{


    const currShop = [
        Shop.upsert({name: 'Mirkas Nude Photo', cost: 25})
    ];
    await Promise.all(currShop)
    console.log('Database synced')
    sequelize.close();


}).catch(console.error);