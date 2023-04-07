import { IsNotEmpty } from 'class-validator';

export class CreateBugDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
