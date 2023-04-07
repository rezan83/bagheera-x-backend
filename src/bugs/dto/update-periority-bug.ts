import { IsEnum } from 'class-validator';
import { Periority } from '../bug.types';

export class UpdatePeriorityBugDto {
  @IsEnum(Periority)
  periority: Periority;
}
