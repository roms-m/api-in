import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Double, OneToMany, ManyToOne} from "typeorm";
import { DetalleIngreso } from "./DetalleIngreso";
import { Persona } from "./Persona";
import { User } from "./User";

@Entity()
export class Ingreso{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    total: number;

    @ManyToOne(() => Persona, persona => persona.ingresos)
    persona: Persona;

    @ManyToOne(() => User, user => user.ingresos)
    user: User;

    @OneToMany(() => DetalleIngreso, detalleIngreso => detalleIngreso.ingreso)
    detalleIngresos: Ingreso[]
    
    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
}