const  { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('genres', {
        name: {
            type: DataTypes.STRING
        },
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false
    });
};
