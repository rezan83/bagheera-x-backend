import { IsEnum } from 'class-validator';
import { Status } from '../bug.types';

export class UpdateStatusBugDto {
  @IsEnum(Status)
  status: Status;
}
