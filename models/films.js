/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Films =  sequelize.define('films', {
    id_film: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_genre: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    id_distributeur: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    resum: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_debut_affiche: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_fin_affiche: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    duree_minutes: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    annee_production: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'films'
  });
  // Films.associate = function(models) {
  //   Films.belongsTo(models.Genres, {foreignKey: 'id_genre', as: 'genre'})
  //   Films.belongsTo(models.Distributeurs, {foreignKey: 'id_distributeur', as: 'distributeur'})
  // };
  return Films;
};
