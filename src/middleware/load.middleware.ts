import { Injectable, Logger, NestMiddleware, Scope } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//Definimos el scope del middleware como DEFAULT, para que la instancia este atada al ciclo de vida de la aplicacion
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
