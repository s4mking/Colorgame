/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('distributeurs', {
    id_distributeur: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cpostal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ville: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pays: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'distributeurs'
  });
};
