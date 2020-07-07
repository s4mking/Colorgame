/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('membres', {
    id_membre: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_personne: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_abonnement: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    date_inscription: {
      type: DataTypes.DATE,
      allowNull: false
    },
    debut_abonnement: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'membres'
  });
};
