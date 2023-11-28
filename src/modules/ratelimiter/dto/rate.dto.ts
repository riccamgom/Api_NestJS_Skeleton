import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RateDto {
  @IsNotEmpty()
  @IsString()
  ip: string;

  @IsNotEmpty()
  @IsNumber()
  route: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
