// import { Bug } from 'src/bugs/bug.entity';
// import { DATA_SOURCE } from 'src/constants';
// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: DATA_SOURCE,
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         database: 'postgres',
//         username: 'postgres',
//         port: parseInt(process.env.PORT),
//         password: process.env.DB_PASSWORD,
//         // autoLoadEntities: true,
//         // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         entities: [Bug],
//         migrations: ['src/database/migrations/*.ts'],
//         migrationsRun: true,
//         synchronize: true,
//       });
//       return dataSource.initialize();
//     },
//   },
// ];
