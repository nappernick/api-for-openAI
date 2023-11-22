// Example: lambda-leads.ts
import { NestFactory } from '@nestjs/core';
import { LeadsModule } from './leads/leads.module';

async function bootstrap() {
  const app = await NestFactory.create(LeadsModule);
  // ...other configurations
}
bootstrap();
