import { IsNotEmpty, IsString } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
