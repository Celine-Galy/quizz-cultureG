import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

if (process.env.NODE_ENV !== 'production') {
    dotenvConfig({ path: '.env.local' });
  } else {
    dotenvConfig({ path: '.env.production' });
  }

const config = {
    type: 'mysql',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    autoloadEntities: true
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
