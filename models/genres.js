/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('genres', {
    id_genre: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'genres'
  });
};
