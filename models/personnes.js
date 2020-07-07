/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personnes', {
    id_personne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date_naissance: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cpostal: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pays: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'personnes'
  });
};
