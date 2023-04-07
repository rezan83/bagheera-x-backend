import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { BugsModule } from './bugs/bug.module';
// import { DatabaseModule } from './databse/database.module';

@Module({
  imports: [
    BugsModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'postgres',
      username: 'postgres',
      port: parseInt(process.env.PORT),
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService, AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
