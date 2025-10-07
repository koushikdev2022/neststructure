import { Exclude, Expose } from 'class-transformer';

@Expose()
export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: number;
  role: number;

  @Exclude()
  password: string;

  created_at: Date;
  updated_at: Date;
}
