
import { DataSource } from 'typeorm';
import { Top10 } from './entities/top10.entity';
export const top10Providers = [
    {
        provide: 'TOP10_REPOSITORY',

        useFactory: (dataSource: DataSource) => dataSource.getRepository(Top10),

        inject: ['DATA_SOURCE'],
    },
];