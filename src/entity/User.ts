import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Ingreso } from "./Ingreso";
import { Venta } from "./Venta";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    clave: string;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Venta, venta => venta.user)
    ventas: Venta[];

    @OneToMany(() => Ingreso, ingreso => ingreso.user)
    ingresos: Ingreso[];
}
