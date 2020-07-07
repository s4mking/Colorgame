/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('abonnements', {
    id_abonnement: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_forfait: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    debut: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'abonnements'
  });
};
