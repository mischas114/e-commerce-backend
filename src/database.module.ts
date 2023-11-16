import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (ConfigService: ConfigService): TypeOrmModuleOptions => ({
				type: 'postgres',
				host: ConfigService.getOrThrow('PG_HOST'),
				port: ConfigService.getOrThrow('PG_PORT'),
				database: ConfigService.getOrThrow('PG_DATABASE'),
				username: ConfigService.getOrThrow('PG_USERNAME'),
				password: ConfigService.getOrThrow('PG_PASSWORD'),
				autoLoadEntities: true,
				synchronize: ConfigService.getOrThrow('PG_SYNCHRONIZE'),
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
