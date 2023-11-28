import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RateDto {
  @IsNotEmpty()
  @IsString()
  ip: string;

  @IsNotEmpty()
  @IsString()
  route: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
