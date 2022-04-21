import { Sequelize } from 'sequelize';
import { config } from '.';

export const db = new Sequelize(config.db.dbName, config.db.user, config.db.pass, {
	host: config.db.host,
	dialect: 'mysql',
	logging: process.env.NODE_ENV == "production" ? false : true
});
