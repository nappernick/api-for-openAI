import { NestFactory } from '@nestjs/core';
import { InvoicesModule } from '../modules/invoices.module';
import { InvoicesService } from '../services/invoices.service';

export const handler = async (event) => {
  // Initialize NestJS application context
  const app = await NestFactory.createApplicationContext(InvoicesModule);
  const invoicesService = app.get(InvoicesService);

  // Extract userId from the event (e.g., from path parameters)
  const userId = event.pathParameters.userId;
  const invoices = await invoicesService.getInvoicesByUserId(userId);

  // Format and return the response
  return {
    statusCode: 200,
    body: JSON.stringify(invoices),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
