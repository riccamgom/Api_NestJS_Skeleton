import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('create')
  createCustomer(@Body() body: CustomerDto) {
    return this.customerService.create(body);
  }

  @Patch('update')
  updateCustomer(@Body() body: Partial<CustomerDto>) {
    return this.customerService.update(body);
  }

  @Delete('delete/:name')
  deleteCustomer(@Param('name') name: string) {
    return this.customerService.delete(name);
  }
}
