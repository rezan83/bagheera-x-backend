import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Periority, Status } from '../bug.types';

export class FilterBugDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;
  @IsOptional()
  @IsNotEmpty()
  description?: string;
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
  @IsOptional()
  @IsEnum(Periority)
  periority?: Periority;
  @IsOptional()
  strict: boolean;
}
