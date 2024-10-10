import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Artistas } from 'src/artistas/entities/artista.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { Favoritos } from 'src/favoritos/entities/favorito.entity';
import { Playlists } from 'src/playlists/entities/playlist.entity';

// El decorador @Entity indica que esta clase representa una entidad en la base de datos

@Entity("canciones")
export class Canciones {
  // Define la columna 'id' como la clave primaria generada automáticamente
  @PrimaryGeneratedColumn()
  cancionId: number;

  // Define la columna 'name' con una longitud máxima de 500 caracteres
  @Column({ length: 45 })
  titulo: string;

  // Define la columna 'año de lanzamiento' como una fecha
  @Column()
  anioLanzamiento: number;

  // Define la columna 'duracion' como un number 
  @Column()
  duracion: number;

  @Column()
  filename: string;

  //relacion uno a muchos, recibe un callback que toma la entidad canciones con la que se va a relacionar, le pone nombre. en el segundo callback toma la entidad artista que es la actual. devuelve arreglo de canciones
  @ManyToMany(() => Artistas, artista => artista.canciones)
  @JoinTable({
    name: 'cancion_artista', // Nombre de la tabla intermedia
    joinColumn: { name: 'cancionId', referencedColumnName: 'cancionId' },
    inverseJoinColumn: { name: 'artistaId', referencedColumnName: 'artistaId' },
  })
  artistas: Artistas[];

  @ManyToOne(() => Genero, genero => genero.canciones)
      genero: Genero;

  @ManyToMany(()=> Favoritos, favorito => favorito.canciones)
  favoritos: Favoritos[]

  @ManyToMany(() => Playlists, playlist => playlist.canciones)
  playlists: Playlists[];


}



