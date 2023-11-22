import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceDto } from '../dtos/invoice.dto'; // Assuming you have an InvoiceDto

@Injectable({})
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async getInvoicesByUserId(invuid: number): Promise<InvoiceDto[]> {
    const invoices = await this.invoiceRepository.find({ where: { invuid } });
    return invoices;
  }

  // ... other methods
}
