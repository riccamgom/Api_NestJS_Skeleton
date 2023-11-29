import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginUserDto } from '../dto/loginUser.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const mockUserService = {
      create: jest.fn(),
    };

    const mockAuthService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('userLogin', () => {
    it('should call authService.login with LoginUserDto', async () => {
      const loginUserDto: LoginUserDto = {
        username: 'user1',
        password: 'password',
      };
      await controller.userLogin(loginUserDto);
      expect(authService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });

  describe('getProfile', () => {
    it('should return profile data', async () => {
      const authHeader = 'Bearer token';
      const userTokenData = {
        username: 'user1',
        role: 'user',
      };
      const result = controller.getprofile(authHeader, userTokenData);
      expect(result).toEqual({ authHeader, userTokenData });
    });
  });

  describe('userRegister', () => {
    it('should call userService.create with CreateUserDto', async () => {
      const createUserDto: CreateUserDto = {
        username: 'user1',
        password: 'password',
        role: 'user',
      };
      await controller.userRegister(createUserDto);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
