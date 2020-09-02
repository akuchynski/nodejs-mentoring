const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:rti147853@localhost:5432/nodedb');

const modelDefiners = [
    require('./user.model')
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

module.exports = sequelize;
