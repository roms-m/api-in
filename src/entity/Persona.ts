import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { DetalleVenta } from "./DetalleVenta";
import { Ingreso } from "./Ingreso";
import { Venta } from "./Venta";

@Entity()
export class Persona{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo_persona: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @Column()
    email: string;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Venta, venta => venta.persona)
    ventas: Venta[];

    @OneToMany(() => Ingreso, ingreso => ingreso.persona)
    ingresos: Ingreso[];
}