import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
// Custom decorator isPublic
import { IS_PUBLIC_KEY } from 'src/common/decorators/ispublic.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  //This method returns an observable boolean
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // If the route is public defined with the custom decorator, the guard doesn't apply
    if (isPublic) {
      return true;
    }
    const tokenAuth = super.canActivate(context);
    return tokenAuth;
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException('JWT Token not valid');
    }
    return user;
  }
}
