import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn, PrimaryColumn} from "typeorm";
import { Articulo } from "./Articulo";
import { Venta } from "./Venta";

@Entity()
export class DetalleVenta{
    
    @PrimaryColumn()
    ventaId: number;

    @ManyToOne(() => Venta, venta => venta.detalleVentas)
    @JoinColumn({ name: "ventaId"})
    venta: Venta;

    @PrimaryColumn()
    articuloId: number;

    @ManyToOne(() => Articulo, articulo => articulo.detalleVentas)
    @JoinColumn({ name: "articuloId"})
    articulo: Articulo;

    @Column()
    cantidad: number;@Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column("double")
    precio: number;


}