import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, } from 'typeorm';
import { Canciones } from 'src/canciones/entities/cancion.entity';

@Entity("artistas")
export class Artistas {
    @PrimaryGeneratedColumn()
    artistaId: number;

    @Column({ length: 20 })
    nombre: string;

    @ManyToMany(() => Canciones, cancion => cancion.artistas)
    canciones: Canciones[];
}
