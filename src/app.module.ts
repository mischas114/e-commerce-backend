import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { ItemsModule } from './items/items.module';
@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule, ItemsModule],
})
export class AppModule {}
