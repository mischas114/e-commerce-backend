import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule],
})
export class AppModule {}
