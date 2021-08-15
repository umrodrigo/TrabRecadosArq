import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from './user.entity';

@Entity({name: 'recados'})
export class NoteEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id'})
    id?: number;

    @Column({ name: 'descricao' })
    descricao: string;

    @Column({ name: 'detalhamento' })
    detalhamento: string;

    @Column({ name: 'user_id'})
    userID: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @Column({ name: "updated_at" })
    updatedAt!: Date;

    @ManyToOne(() => UserEntity, user => user.note)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user?: UserEntity;
    
    

    constructor(descricao: string, detalhamento: string, userID:string) {
        super();
        this.descricao = descricao;
        this.detalhamento = detalhamento;
        this.userID = userID;
    }

    @BeforeInsert()
    private date() {        
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    };
    
    @BeforeUpdate()
    private update() {
        this.updatedAt = new Date(Date.now());
    };
}