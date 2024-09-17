import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cat_id: string

    @CreateDateColumn()
    created_at: Date
}
