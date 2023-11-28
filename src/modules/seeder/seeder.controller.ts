import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Public } from 'src/common/decorators/isPublic.decorator';

@Controller('seeder')
export class SeederController {
  constructor(private seederService: SeederService) {}

  @Public()
  @Get('populate')
  addData() {
    return this.seederService.seedData();
  }
}
