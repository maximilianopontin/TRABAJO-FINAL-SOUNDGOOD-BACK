import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Canciones } from 'src/canciones/entities/cancion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('playlists')

export class Playlists {

    @PrimaryGeneratedColumn()
    playlistId: number;

    // Define la columna 'title' con una longitud máxima de 20 caracteres
    @Column({ length: 20})
    title: string;
   
//muchas playlists puede ser creada por un usuario
   @ManyToOne(() => Usuario, usuario => usuario.playlists)
    usuario: Usuario;

    //Una playlist puede contener varias canciones y Una canción puede aparecer en varias playlists. (Many-to-Many).
    @ManyToMany(() => Canciones, canciones => canciones.playlists)
    @JoinTable()
    canciones: Canciones[];
}


    
    


