import { CryptoService } from 'src/common/crypto.service';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto';
import { RateDto } from 'src/modules/ratelimiter/dto/rate.dto';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';

const cryptoService = new CryptoService();

export const customers: CustomerDto[] = [
  {
    name: 'John',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, AT 12345',
  },
  {
    name: 'Jane',
    email: 'jane@example.com',
    phone: '+4487654321',
    address: '456 Elm St, Othertown, OT 54321',
  },
  {
    name: 'Alex',
    email: 'alex@example.com',
    phone: '+35666111222',
    address: '789 Oak St, Sometown, ST 67890',
  },
];

export const rateLimiters: RateDto[] = [
  {
    route: '/user/register',
    weight: 1,
  },
  {
    route: '/user/profile',
    weight: 2,
  },
  {
    route: '/customer/create',
    weight: 5,
  },
];

export const users: CreateUserDto[] = [
  {
    username: 'user1',
    password: cryptoService.encrypt('password1'),
    role: 'admin',
  },
  {
    username: 'user2',
    password: cryptoService.encrypt('password2'),
    role: 'user',
  },
  {
    username: 'user3',
    password: cryptoService.encrypt('password3'),
    role: 'user',
  },
];
