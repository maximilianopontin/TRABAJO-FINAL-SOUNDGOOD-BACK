import { Canciones } from "src/canciones/entities/cancion.entity";
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('top10')

export class Top10 {
    @PrimaryGeneratedColumn()
    top10Id: number;

    @ManyToMany(() => Canciones, (cancion) => cancion.top10Id)
    @JoinTable()
    canciones: Canciones[];
}
