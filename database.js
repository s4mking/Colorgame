const userModel = require('./models/User')
const colorbattleModel = require('./models/Colorbattle')
const filmModel = require('./models/films')

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('cinema', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889 //sur mac
});

const User = userModel(sequelize, DataTypes)
const Colorbattle = colorbattleModel(sequelize, DataTypes)
const Films = filmModel(sequelize, DataTypes)
// sequelize.sync({
//     alter:{
//         drop:false
//     }
// })

module.exports = {
    sequelize: sequelize,
    User: User,
    Colorbattle: Colorbattle,
    Films : Films
}