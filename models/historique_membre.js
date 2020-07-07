/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historique_membre', {
    id_historique: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_membre: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_seance: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'historique_membre'
  });
};
