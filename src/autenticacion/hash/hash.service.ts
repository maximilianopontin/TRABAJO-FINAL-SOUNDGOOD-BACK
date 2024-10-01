import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt' //instalamos npm install bcrypt y npm install --save-dev @types/bcrypt
//algoritmo que permite encriptar la contraseña

@Injectable()
export class HashService {
  private readonly saltRounds = 10;//algoritmo aleatorio para la contraseña, cuanto mas alto es mas dificil de hackear
  //creamos metodo hash para encriptar la contraseña que se recibe del usuario
  async hashPassword(contraseña: string): Promise<string> {
    return await bcrypt.hash(contraseña, this.saltRounds);//contraseña encriptada
  }
  //creamos metodo para descriptar la contraseña, comparando la que ingresa el usuario con la contraseña hasheada de la base de datos
  async comparePassword(contraseña: string, hashedPassword: string) {
    return await bcrypt.compare(contraseña, hashedPassword);
  }
}
