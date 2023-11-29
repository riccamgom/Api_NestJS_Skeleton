import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RatelimiterService } from 'src/modules/ratelimiter/ratelimiter.service';

//Scope as DEFAULT to tie instance to app lifecycle
@Injectable({ scope: Scope.DEFAULT })
export class LoadMiddleware implements NestMiddleware {
  private readonly tokenLimit: number;
  private readonly ipLimit: number;
  private readonly defaultLimit = 100;
  constructor(
    private readonly configService: ConfigService,
    private readonly rateLimiterService: RatelimiterService,
  ) {
    this.tokenLimit =
      this.configService.get<number>('limit.token') || this.defaultLimit;
    this.ipLimit =
      this.configService.get<number>('limit.ip') || this.defaultLimit;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const token = req.headers.authorization;
    const route = req.originalUrl;
    let routeWeight = 1; //Default weight
    let ipCount = 0;
    let tokenCount = 0;

    // Get route weight for rate limiting
    if (route) {
      const routeWeightRes: number =
        await this.rateLimiterService.getRouteWeight(route);
      if (routeWeightRes) {
        routeWeight = routeWeightRes;
      }
    }

    // Get IP and Token counts
    const [ipCountResult, tokenCountResult] = await Promise.all([
      ip
        ? this.rateLimiterService.addIpCount(ip, routeWeight)
        : Promise.resolve(0),
      token
        ? this.rateLimiterService.addTokenCount(token, routeWeight)
        : Promise.resolve(0),
    ]);
    ipCount += ipCountResult;
    tokenCount += tokenCountResult;

    // If the limit is exceeded, send a 429 status code
    if (tokenCount > this.tokenLimit) {
      res.status(429).send('Requests by token limit exceeded');
    } else if (ipCount > this.ipLimit) {
      res.status(429).send('Requests by ip limit exceeded');
    } else {
      next();
    }
  }
}
