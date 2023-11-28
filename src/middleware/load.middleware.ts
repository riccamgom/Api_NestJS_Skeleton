import { Injectable, Logger, NestMiddleware, Scope } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//Scope as DEFAULT to tie instance to app lifecycle
@Injectable({ scope: Scope.DEFAULT })
export class LoadMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoadMiddleware.name);

  use(req: Request, res: any, next: NextFunction) {
    this.logger.log('Log view Example Middleware');
    console.log('Example Middleware');
    //console.log("Middleware request body:" , req.body);
    next();
  }
}
