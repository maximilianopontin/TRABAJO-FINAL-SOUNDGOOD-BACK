import { Canciones } from "src/canciones/entities/cancion.entity";
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('tendencias')
export class Tendencia {
    @PrimaryGeneratedColumn()
    tendenciasId: number;

    @ManyToMany(() => Canciones, (cancion) => cancion.tendenciaId)
    @JoinTable()
    canciones: Canciones[];
}
