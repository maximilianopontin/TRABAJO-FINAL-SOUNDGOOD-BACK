import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Canciones } from 'src/canciones/entities/cancion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('favoritos')
export class Favoritos {
  @PrimaryGeneratedColumn()
  favoritoId: number;

  //Un usuario puede tener varios favoritos y Un favorito puede pertenecer a varios usuarios
  @ManyToOne(() => Usuario, usuario => usuario.favoritos)
  usuario: Usuario;


  //Un favorito puede contener varias canciones y Una canción puede estar en varios favoritos de diferentes usuarios.
  @ManyToOne(() => Canciones, cancion => cancion.favoritos)
  cancion: Canciones;
}

