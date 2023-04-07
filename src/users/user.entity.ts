import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bug } from '../bugs/bug.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Bug, (bug) => bug.assignee)
  assignedBugs: Bug[];

  @OneToMany(() => Bug, (bug) => bug.reporter)
  reportedBugs: Bug[];
}
