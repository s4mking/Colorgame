/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seances', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_film: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_salle: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_personne_ouvreur: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_personne_technicien: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_personne_menage: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    debut_seance: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fin_seance: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'seances'
  });
};
