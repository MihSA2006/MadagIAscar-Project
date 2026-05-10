import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/user.entity';

export enum ChecklistPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum ChecklistStatus {
    TODO = 'à faire',
    IN_PROGRESS = 'en cours',
    DONE = 'terminé',
}

@Entity()
export class ChecklistAI {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: ChecklistPriority,
        default: ChecklistPriority.MEDIUM,
    })
    priority: ChecklistPriority;

    @Column({ type: 'timestamp', nullable: true })
    deadline: Date;

    @Column({
        type: 'enum',
        enum: ChecklistStatus,
        default: ChecklistStatus.TODO,
    })
    status: ChecklistStatus;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
