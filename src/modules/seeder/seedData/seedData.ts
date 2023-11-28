export const customers = [
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

export const rateLimiters = [
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

export const users = [
  {
    username: 'user1',
    password: 'password1',
    role: 'admin',
  },
  {
    username: 'user2',
    password: 'password2',
    role: 'user',
  },
  {
    username: 'user3',
    password: 'password3',
    role: 'user',
  },
];
