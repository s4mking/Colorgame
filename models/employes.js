/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employes', {
    id_employe: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_personne: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_fonction: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'employes'
  });
};
