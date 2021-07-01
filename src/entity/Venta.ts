import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { DetalleVenta } from "./DetalleVenta";
import { Persona } from "./Persona";
import { User } from "./User";

@Entity()
export class Venta{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Persona, persona => persona.ventas)
    persona: Persona;

    @ManyToOne(() => User, user => user.ventas)
    user: User;

    @OneToMany(() => DetalleVenta, detalleVenta => detalleVenta.venta)
    detalleVentas: DetalleVenta[];

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}