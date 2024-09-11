import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Canciones } from 'src/canciones/entities/cancion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('favoritos')
export class Favoritos {
  @PrimaryGeneratedColumn()
  favoritoId: number;

  //Un usuario puede tener varios favoritos y Un favorito puede pertenecer a varios usuarios
  @ManyToMany(() => Usuario, usuario => usuario.favoritos)
  @JoinTable({
    name: 'usuario_favoritos', // Nombre de la tabla de unión
    joinColumn: { name: 'favoritoId', referencedColumnName: 'favoritoId' }, // Ajustar nombre de columna de unión
    inverseJoinColumn: { name: 'usuarioId', referencedColumnName: 'usuarioId' }, // Ajustar nombre de columna de usuario
  })
  usuarios: Usuario[];

  //Un favorito puede contener varias canciones y Una canción puede estar en varios favoritos de diferentes usuarios.
  @ManyToMany(() => Canciones, cancion => cancion.favoritos)
  @JoinTable({
    name: 'favorito_canciones', // Nombre de la tabla de unión
    joinColumn: { name: 'favoritoId', referencedColumnName: 'favoritoId' }, // Ajustar columna de unión para favoritos
    inverseJoinColumn: { name: 'cancionId', referencedColumnName: 'cancionId' }, // Ajustar columna de canciones
  })
  canciones: Canciones[];
}

