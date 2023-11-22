import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadDto } from '../dtos/lead.dto'; // Assuming you have a LeadDto

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(LeadDto)
    private leadRepository: Repository<LeadDto>,
  ) {}

  async getLeadsByUserId(luid: number): Promise<LeadDto[]> {
    const leads = await this.leadRepository.find({ where: { luid } });
    return leads;
  }

  // ... other methods
}
