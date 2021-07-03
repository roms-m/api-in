import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn, PrimaryColumn} from "typeorm";
import { Articulo } from "./Articulo";
import { Ingreso } from "./Ingreso";

@Entity()
export class DetalleIngreso{
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Ingreso, ingreso => ingreso.detalleIngresos)
    ingreso: Ingreso;

    @ManyToOne(() => Articulo, ingreso => ingreso.detalleIngresos)
    articulo: Articulo;

    @Column()
    catidad: number;
    
    @Column("double")
    precio: number;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}