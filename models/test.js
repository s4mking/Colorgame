/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    sam: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    test: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    tableName: 'test'
  });
};
