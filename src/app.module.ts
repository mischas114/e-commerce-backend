import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/ormconfig';
@Module({
	imports: [UsersModule, TodosModule, TypeOrmModule.forRoot(config)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
