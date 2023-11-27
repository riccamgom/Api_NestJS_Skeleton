import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
//Decorators
import { Public } from 'src/common/decorators/isPublic.decorator';
import { TokenData } from 'src/common/decorators/tokenData.decorator';
//DTOs
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async userLogin(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Get('profile')
  getprofile(
    @Headers('Authorization') authHeader: string,
    @TokenData() user: any,
  ) {
    return { authHeader, userTokenData: user };
  }

  @Post('register')
  async userRegister(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
