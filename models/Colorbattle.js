        module.exports = (sequelize, DataTypes) => {
            
            //console.log(arrayDefault)
            return sequelize.define('Colorbattle', {
            
                color: {
                    type: DataTypes.TEXT,
                   // defaultValue: arrayDefault,
             get: function () {
                  return JSON.parse(this.getDataValue('color'));
              },
              set: function (color) {
                  this.setDataValue('color', JSON.stringify(color));
                }
                },
              
        
            }, {
        
            });
        
        }