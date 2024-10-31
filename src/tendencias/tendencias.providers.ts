
import { DataSource } from 'typeorm';
import { Tendencia } from './entities/tendencia.entity';
export const tendenciaProviders = [
    {
        provide: 'TENDENCIA_REPOSITORY',

        useFactory: (dataSource: DataSource) => dataSource.getRepository(Tendencia),

        inject: ['DATA_SOURCE'],
    },
];