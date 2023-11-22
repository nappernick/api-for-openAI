import { Injectable } from '@nestjs/common';
import { InvoiceDto } from '../dtos/invoice.dto';

@Injectable()
export class InvoiceRepository {
  // Replace with actual ORM query
  async findByUserId(userId: string): Promise<InvoiceDto[]> {
    // Replace with actual ORM query
    // @ts-expect-error
    return userId;
  }
}
