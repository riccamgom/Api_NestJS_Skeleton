import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //This method is called by the local strategy to check if the user exists and the password is correct
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //This method generate a JWT token - Call users.service.ts and add the user data to the token
  async login(loginBody: any) {
    //Add expiration time to the response
    const expiresInSeconds = Number(
      await this.configService.get('jwtDateExpirationTime'),
    );
    const accessTokenExpiresAt = new Date(
      new Date().getTime() + expiresInSeconds * 1000,
    );

    //This is added to the token to use it in the @TokenData() decorator
    const user = await this.usersService.findOne(loginBody.username);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    const payload = {
      ...userWithoutPassword,
      loginData: 'tokenData for login',
    };
    return {
      accessToken: {
        expireAt: accessTokenExpiresAt,
        token: this.jwtService.sign(payload),
      },
    };
  }
}
