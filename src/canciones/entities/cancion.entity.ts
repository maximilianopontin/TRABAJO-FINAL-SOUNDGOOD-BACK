import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Artistas } from 'src/artistas/entities/artista.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { Favoritos } from 'src/favoritos/entities/favorito.entity';
import { Playlists } from 'src/playlists/entities/playlist.entity';

@Entity("canciones")
export class Canciones {
  @PrimaryGeneratedColumn()
  cancionId: number;

  @Column({ length: 45 })
  titulo: string;

  @Column()
  añoLanzamiento: number;

  @Column()
  duracion: number;

  @Column()
  filename: string;

  @ManyToMany(() => Artistas, artista => artista.canciones)
  @JoinTable({
    name: 'cancion_artista',
    joinColumn: { name: 'cancionId', referencedColumnName: 'cancionId' },
    inverseJoinColumn: { name: 'artistaId', referencedColumnName: 'artistaId' },
  })
  artistas: Artistas[];

  @ManyToOne(() => Genero, genero => genero.canciones)
  genero: Genero;

  @ManyToMany(() => Favoritos, favorito => favorito.canciones)
  favoritos: Favoritos[];

  @ManyToMany(() => Playlists, playlist => playlist.canciones)
  playlists: Playlists[];
}
