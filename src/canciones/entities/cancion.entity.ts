import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Artistas } from 'src/artistas/entities/artista.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { Favoritos } from 'src/favoritos/entities/favorito.entity';
import { Playlists } from 'src/playlists/entities/playlist.entity';
import { Top10 } from 'src/top10/entities/top10.entity';
import { Tendencia } from 'src/tendencias/entities/tendencia.entity';

@Entity("canciones")
export class Canciones {
  @PrimaryGeneratedColumn()
  cancionId: number;

  @Column({ length: 45 })
  titulo: string;

  @Column()
  anioLanzamiento: number;

  @Column()
  duracion: number;

  // Campo para almacenar el nombre del archivo de la canción
  @Column({ nullable: true })
  songFilename: string;

  // Campo para almacenar el nombre del archivo de la imagen
  @Column({ nullable: true })
  imageFilename: string;

  @ManyToMany(() => Artistas, artista => artista.canciones, { cascade: true })
  @JoinTable({
    name: 'cancion_artista',
    joinColumn: { name: 'cancionId', referencedColumnName: 'cancionId' },
    inverseJoinColumn: { name: 'artistaId', referencedColumnName: 'artistaId' },
  })
  artistas: Artistas[];

  @ManyToOne(() => Genero, genero => genero.canciones, { cascade: true })
  genero: Genero;

  @ManyToMany(() => Favoritos, favorito => favorito.canciones, { cascade: true })
  favoritos: Favoritos[];

  @ManyToMany(() => Playlists, playlist => playlist.canciones, { cascade: true })
  playlists: Playlists[];

  @ManyToMany(() => Top10, top10 => top10.canciones, { cascade: true })
  top10Id: Top10[];

  @ManyToMany(() => Tendencia, tendencia => tendencia.canciones, { cascade: true })
  tendenciaId: Tendencia[];
}
