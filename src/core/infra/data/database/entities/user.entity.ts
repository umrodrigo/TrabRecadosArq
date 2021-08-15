import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
//import { Recado } from "./Recado";

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @PrimaryColumn({ name: 'id'})
    id!: string;

    @Column({ name: 'username'})
    username!: string;

    @Column({ name: 'password'})
    password!: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @Column({ name: "updated_at" })
    updatedAt!: Date;

    //@OneToMany(() => Recado, (recado) => recado.user)
    //recado?: Recado[]
    

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }

    @BeforeInsert()
    criarID() {
        this.id = uuid()
    }    
}