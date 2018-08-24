const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password',{
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});

sequelize.import('dbModels/Users')

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then (async()=> {
   await console.log('Synced!');
    sequelize.close();
})

