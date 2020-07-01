const userModel = require('./models/User')
const colorbattleModel = require('./models/Colorbattle')

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('project', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889 //sur mac
});

const User = userModel(sequelize, DataTypes)
const Colorbattle = colorbattleModel(sequelize, DataTypes)
sequelize.sync({
    alter:{
        drop:false
    }
})

module.exports = {
    sequelize: sequelize,
    User: User,
    Colorbattle: Colorbattle
}