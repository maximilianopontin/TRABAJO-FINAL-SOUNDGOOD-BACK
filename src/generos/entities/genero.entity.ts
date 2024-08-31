import { Canciones } from "src/canciones/entities/cancion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('generos')
export class Genero {
    @PrimaryGeneratedColumn()
    generoId: number;

    @Column({length: 45})
    genero:string;

    @OneToMany(() => Canciones, cancion => cancion.genero)
    canciones: Canciones[];
}
