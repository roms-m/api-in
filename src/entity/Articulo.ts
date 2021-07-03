import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Double, OneToMany} from "typeorm";
import { DetalleIngreso } from "./DetalleIngreso";
import { DetalleVenta } from "./DetalleVenta";

@Entity()
export class Articulo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column()
    nombre: string;

    @Column("double")
    precio_venta: number;

    @Column()
    stock: number;

    @Column()
    descripcion: string;

    @Column()
    imagen: string;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => DetalleVenta, detalleVenta => detalleVenta.articulo)
    public detalleVentas !: DetalleVenta[];

    @OneToMany(() => DetalleIngreso, detalleIngreso => detalleIngreso.articulo)
    public detalleIngresos !: DetalleIngreso[];
}