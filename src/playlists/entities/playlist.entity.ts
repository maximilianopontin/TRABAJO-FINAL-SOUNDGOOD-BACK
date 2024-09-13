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
    usuarios: Usuario;

    //Una playlist puede contener varias canciones y Una canción puede aparecer en varias playlists. (Many-to-Many).
    @ManyToMany(() => Canciones, cancion => cancion.playlists)
    @JoinTable({
        name: 'playlist_canciones', // Nombre de la tabla de unión
        joinColumn: { name: 'playlistId', referencedColumnName: 'playlistId' }, // Ajustar columna de unión para favoritos
        inverseJoinColumn: { name: 'cancionId', referencedColumnName: 'cancionId' }, // Ajustar columna de canciones
    })
    canciones: Canciones[];
}
    
    


