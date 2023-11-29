import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async create(customer: CustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(customer);
    return createdCustomer.save();
  }

  async update(customer: Partial<CustomerDto>): Promise<Customer> {
    return this.customerModel.findOneAndUpdate(
      { name: customer.name },
      customer,
      {
        new: true,
      },
    );
  }

  async delete(name: string): Promise<any> {
    return this.customerModel.findOneAndDelete({ name: name });
  }
}
