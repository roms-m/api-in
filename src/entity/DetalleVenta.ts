import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn, PrimaryColumn} from "typeorm";
import { Articulo } from "./Articulo";
import { Venta } from "./Venta";

@Entity()
export class DetalleVenta{

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public cantidad: number;
    
    @Column()
    @CreateDateColumn()
    public createAt !: Date;
    
    @Column()
    @UpdateDateColumn()
    public updatedAt !: Date;
    
    @Column("double")
    public precio !: number;
    
    @ManyToOne(() => Venta, venta => venta.detalleVentas)
    public venta !: Venta;
    
    @ManyToOne(() => Articulo, articulo => articulo.detalleVentas)
    public articulo !: Articulo;
    
}