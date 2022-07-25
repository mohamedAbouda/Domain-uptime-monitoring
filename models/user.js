const Sequelize = require('sequelize')

const sequelize = require('../util/connection')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    verificationToken: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
});

module.exports = User;