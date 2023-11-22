import { Module, DynamicModule, Global } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { DbConnectionOptions } from '../modules/db-connection-options.interface';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(options: DbConnectionOptions): DynamicModule {
    const databaseProvider = {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        await createConnection({
          type: 'mariadb',
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,
          entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
          // additional TypeORM configuration options
        });
      },
    };

    return {
      module: DatabaseModule,
      providers: [databaseProvider],
      exports: [databaseProvider],
    };
  }
}
