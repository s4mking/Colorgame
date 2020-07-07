/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salles', {
    id_salle: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    numero_salle: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    nom_salle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    etage_salle: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    places: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'salles'
  });
};
