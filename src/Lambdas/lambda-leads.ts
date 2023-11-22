import { NestFactory } from '@nestjs/core';
import { LeadsModule } from '../modules/leads.module';
import { LeadsService } from '../services/leads.service';

export const handler = async (event) => {
  const app = await NestFactory.createApplicationContext(LeadsModule);
  const leadsService = app.get(LeadsService);

  // Extract userId from the event, and fetch leads
  const userId = event.pathParameters.userId;
  const leads = await leadsService.getLeadsByUserId(userId);

  // Format and return the response
  return {
    statusCode: 200,
    body: JSON.stringify(leads),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
