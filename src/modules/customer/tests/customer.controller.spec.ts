import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../customer.controller';
import { CustomerService } from '../customer.service';
import { CustomerDto } from '../dto/customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should call customerService.create with the provided dto', async () => {
      const customerDto: CustomerDto = {
        name: 'Name',
        email: 'test@mail.com',
        phone: '+34666111222',
        address: 'Example street, 1',
      };
      await controller.createCustomer(customerDto);
      expect(service.create).toHaveBeenCalledWith(customerDto);
    });
  });

  describe('updateCustomer', () => {
    it('should call customerService.update with the provided dto', async () => {
      const partialCustomerDto: Partial<CustomerDto> = {
        name: 'Name',
        email: 'test@mail.com',
        phone: '+34666111222',
        address: 'Example street, 1',
      };
      await controller.updateCustomer(partialCustomerDto);
      expect(service.update).toHaveBeenCalledWith(partialCustomerDto);
    });
  });

  describe('deleteCustomer', () => {
    it('should call customerService.delete with the provided name', async () => {
      const name = 'nombreEjemplo';
      await controller.deleteCustomer(name);
      expect(service.delete).toHaveBeenCalledWith(name);
    });
  });
});
