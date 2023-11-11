import { Db } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
	type: 'postgres',
	entities: ['dist/**/entities/*.entity.js'],
	//toDO nicht für Prod., ggf. mit eleganterer Lsg. austauschen
	synchronize: true,
};
export default config;
