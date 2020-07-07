/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reductions', {
    id_reduction: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pourcentage_reduction: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'reductions'
  });
};
