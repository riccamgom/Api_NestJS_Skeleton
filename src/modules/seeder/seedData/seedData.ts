import { CryptoService } from 'src/common/crypto.service';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto';
import { RateDto } from 'src/modules/ratelimiter/dto/rate.dto';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';

const cryptoService = new CryptoService();

export const customers: CustomerDto[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St, Anytown, AT 12345',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '0987654321',
    address: '456 Elm St, Othertown, OT 54321',
  },
  {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '5555555555',
    address: '789 Oak St, Sometown, ST 67890',
  },
];

export const rateLimiters: RateDto[] = [
  {
    ip: '192.168.1.1',
    route: '/api/resource',
    count: 5,
  },
  {
    ip: '192.168.1.2',
    route: '/api/another-resource',
    count: 3,
  },
  {
    ip: '192.168.1.3',
    route: '/api/different-resource',
    count: 7,
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
