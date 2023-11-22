import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { LeadRepository } from '../repositories/lead.repository';
import { PhotoStorageService } from './photo-storage.service';
import { InvoiceDto } from '../dtos/invoice.dto';
import { LeadDto } from '../dtos/lead.dto';
import '../../types/api';

@Injectable()
export class AppService {
  constructor(
    private leadRepository: LeadRepository,
    private invoiceRepository: InvoiceRepository,
    private photoStorageService: PhotoStorageService,
  ) {}

  async getLeadsByUserId(userId: string): Promise<LeadDto[]> {
    return this.leadRepository.findByUserId(userId);
  }

  async getInvoicesByUserId(userId: string): Promise<InvoiceDto[]> {
    return this.invoiceRepository.findByUserId(userId);
  }

  // ! Need to define this once shape is known
  async postPhoto(file: any): Promise<any> {
    return this.photoStorageService.storePhoto(file);
  }
}
