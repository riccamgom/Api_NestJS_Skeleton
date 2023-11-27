import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Public } from 'src/common/decorators/isPublic.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async userLogin(@Body() body: UserDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async userRegister(@Body() body: UserDto) {
    return this.userService.register(body);
  }
}
