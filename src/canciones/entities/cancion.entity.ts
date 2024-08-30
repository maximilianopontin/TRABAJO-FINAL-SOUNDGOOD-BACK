

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

// El decorador @Entity indica que esta clase representa una entidad en la base de datos
@Entity("canciones")

export class Canciones {
    // Define la columna 'id' como la clave primaria generada automáticamente
    @PrimaryGeneratedColumn()
    id: number;

    // Define la columna 'name' con una longitud máxima de 500 caracteres
    @Column({ length: 45 })
    titulo: string;

    // Define la columna 'año de lanzamiento' como una fecha
    @Column()
    añoLanzamiento: number;

    // Define la columna 'duracion' como un number 
    @Column()
    duracion: number;

    @Column()
    filename: string;
    /*
        // Define la columna 'generoId' como una cadena de texto, clave foranea
         @Column()
        generoId: number;
    
         // Define la columna 'artista' como una cadena de texto
        @Column()
        artistaId: number;
    
         // Define la columna 'favoritos' como una cadena de texto
        @Column()
        favoritos: ;
          // Define la columna 'playlist' como una cadena de texto
        @Column()
        playlist: ;

       @ManyToMany(() => Artista, artista => artista.cancion)
        artistas: Artista[];
    
        @OneToMany(() => Genero, genero => genero.cancion)
        generos: Genero;
        
        */

}



