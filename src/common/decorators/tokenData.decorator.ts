import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//This decoratos get the request object and returns the user data from the token
export const TokenUserData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
