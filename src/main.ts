import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FastifyServerOptions, FastifyInstance, fastify } from 'fastify';
import { Logger } from '@nestjs/common';

export interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

async function bootstrapServer(): Promise<NestApp> {
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
    { logger: !process.env.AWS_EXECUTION_ENV ? new Logger() : console },
  );
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.enableCors({
    origin: '*', // or specify domains ['http://example.com', 'http://example.org']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // or whatever method you wish to allow
    allowedHeaders: 'Content-Type, Accept', // and any other headers you want to allow
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  await app.init();
  return { app, instance };
}
bootstrapServer();

export default bootstrapServer;
