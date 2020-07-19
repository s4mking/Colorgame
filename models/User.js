module.exports = (sequelize, DataTypes) => {

    let model = sequelize.define('User', {
    
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ban: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        unban_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "HELLO"
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }

    }, {

    });

    model.prototype.isAdmin = function () {
        return this.role === 3
    }

    model.prototype.isSupport = function () {
        return this.role === 2 || this.isAdmin()
    }

    return model

}