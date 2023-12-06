import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 20 })
  title: string;

  @Column({ length: 20, enum: ['work', 'personal', 'shopping', 'study'] })
  category: string;

  @Column({ length: 150 })
  description: string;

  @Column({ type: 'boolean', default: false })
  isDone: boolean;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
