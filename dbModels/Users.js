module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            defaultValue:0,
            allowNull: false,
        },
        guild_id: {
            type: DataTypes.STRING,
            allowNull: false,     
        },
        hitpoints: {
            type: DataTypes.INTEGER,
            defaultValue: 20,
            allowNull: false,

        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    }, {
            timestamps: false,
        
    });
};