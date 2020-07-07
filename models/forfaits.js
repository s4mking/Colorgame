/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('forfaits', {
    id_forfait: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    resum: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prix: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    duree_jours: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'forfaits'
  });
};
