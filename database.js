const userModel = require('./models/User')
const colorbattleModel = require('./models/Colorbattle')
const filmModel = require('./models/films')
const genreModel = require('./models/genres')
const distributeurModel = require('./models/distributeurs')

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('cinema', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889 //sur mac
});

const User = userModel(sequelize, DataTypes)
const Colorbattle = colorbattleModel(sequelize, DataTypes)
const Films = filmModel(sequelize, DataTypes)
const Genres = genreModel(sequelize, DataTypes)
const Distributeurs = distributeurModel(sequelize, DataTypes)

Genres.hasMany(Films)
Films.belongsTo(Genres,{foreignKey: 'id_genre'})

Distributeurs.hasMany(Films)
Films.belongsTo(Distributeurs,{foreignKey: 'id_distributeur'})

sequelize.sync({
    alter:{
        drop:false
    }
})

module.exports = {
    sequelize: sequelize,
    User: User,
    Colorbattle: Colorbattle,
    Films : Films,
    Genres : Genres,
    Distributeurs : Distributeurs
}