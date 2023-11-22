import { Controller, Get, Param } from '@nestjs/common';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceService } from '../services/invoices.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':userId')
  getInvoicesByUserId(@Param('userId') userId: string): Promise<Invoice[]> {
    return this.invoiceService.getInvoicesByUserId(userId);
  }

  // Implement other endpoints as needed
}
