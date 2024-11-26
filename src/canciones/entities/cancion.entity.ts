import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Artistas } from 'src/artistas/entities/artista.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { Playlists } from 'src/playlists/entities/playlist.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

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

  @Column({ default: 0 })
  reproducciones?: number;

  @Column({ type: 'boolean', default: false})
  tendencia?: boolean;

  @Column({ type: 'boolean', default: false})
  top10?: boolean;

  @ManyToMany(() => Artistas, artista => artista.canciones, { cascade: true })
  @JoinTable()
  // @JoinTable({
  //   name: 'cancion_artista',
  //   joinColumn: { name: 'cancionId', referencedColumnName: 'cancionId' },
  //   inverseJoinColumn: { name: 'artistaId', referencedColumnName: 'artistaId' },
  // })
  artistas: Artistas[];

  @ManyToOne(() => Genero, genero => genero.canciones, { cascade: true })
  genero: Genero;

  @ManyToMany(() => Playlists, playlist => playlist.canciones, { cascade: true })
  @JoinTable()
  playlists: Playlists[];

  @ManyToMany(() => Usuario, usuario => usuario.canciones)
  @JoinTable()
  usuario: Usuario[];
}
