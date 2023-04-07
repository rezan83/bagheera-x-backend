import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Periority, Status } from './bug.types';

@Entity()
export class Bug {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column({ enum: Status, default: Status.OPEN })
  status: Status;

  @Column({ enum: Periority, default: Periority.LOW })
  periority: Periority;

  @Column({ default: false })
  solved: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.assignedBugs)
  assignee: User;

  @ManyToOne(() => User, (user) => user.reportedBugs)
  reporter: User;
}
