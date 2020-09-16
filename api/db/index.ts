import { Sequelize, Dialect } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT as Dialect
});

// const modelDefiners = [
//     require('./models/user.model')
// ];

// for (const modelDefiner of modelDefiners) {
//     modelDefiner(sequelize);
// }

// export default sequelize;

export { sequelize };
