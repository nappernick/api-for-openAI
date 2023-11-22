// leads.controller.ts

import { Controller, Get } from '@nestjs/common';
import { LeadsService } from '../services/leads.service';
import { LeadDto } from '../dtos/lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get(':userId')
  getLeadsByUserId(@Param('userId') userId: string): Promise<LeadDto[]> {
    return this.leadsService.getLeadsByUserId(userId);
  }

  // Add endpoints for create, update, delete, and find by id
}
