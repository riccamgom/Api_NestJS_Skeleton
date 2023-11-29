import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RateDto {
  @IsNotEmpty()
  @IsString()
  route: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}

export class IpDto {
  @IsNotEmpty()
  @IsString()
  ip: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
