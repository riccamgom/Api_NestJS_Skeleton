import {
  Inject,
  Injectable,
  NestMiddleware,
  Scope,
  forwardRef,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
//import { RatelimiterService } from 'src/modules/ratelimiter/ratelimiter.service';

//Scope as DEFAULT to tie instance to app lifecycle
@Injectable({ scope: Scope.DEFAULT })
export class LoadMiddleware implements NestMiddleware {
  private readonly defaultLimit = 100;

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const route = req.originalUrl;

    // Database query to get the limit for the route or default
    const limit = 10; //this.routeConfig[route] || this.defaultLimit;
    // Database query to get the current request count for the route
    //const test = await this.rateLimiterService.findAll();
    const count = 5; // await this.accessService.getAndUpdateRequestCount(ip, route);

    if (count > limit) {
      // If the limit is exceeded, send a 429 status code
      res.status(429).send('Too Many Requests');
    } else {
      // Otherwise, continue
      next();
    }
  }
}
