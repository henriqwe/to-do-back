const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'henri519_todolist',
    'henri519_todo',
    'todo123', { dialect: 'mysql', host: '50.116.87.178' }
);
module.exports = sequelize;