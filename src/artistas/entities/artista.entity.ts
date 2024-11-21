import { Canciones } from 'src/canciones/entities/cancion.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany,} from 'typeorm';

@Entity ("artistas")

export class Artistas {

    @PrimaryGeneratedColumn()
    artistaId: number;

    @Column( {length: 20})
    nombre: string;

   @ManyToMany(() => Canciones, cancion => cancion.artistas)
    canciones: Canciones[];
   

}
