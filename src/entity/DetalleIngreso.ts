import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn, PrimaryColumn} from "typeorm";
import { Articulo } from "./Articulo";
import { Ingreso } from "./Ingreso";

@Entity()
export class DetalleIngreso{
    @PrimaryColumn()
    ingresoId: number;

    @ManyToOne(() => Ingreso, ingreso => ingreso.detalleIngresos)
    @JoinColumn({ name: "ingresoId"})
    ingreso: Ingreso;

    @PrimaryColumn()
    articuloId: number;

    @ManyToOne(() => Articulo, ingreso => ingreso.detalleIngresos)
    @JoinColumn({ name: "articuloId"})
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