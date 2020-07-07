/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fonctions', {
    id_fonction: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    salaire: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cadre: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'fonctions'
  });
};
