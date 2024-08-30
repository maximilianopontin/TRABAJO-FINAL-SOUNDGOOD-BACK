import { Test, TestingModule } from '@nestjs/testing';
import { CancionesService } from './cancion.service';

describe('CancionesService', () => {
  let service: CancionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancionesService],
    }).compile();

    service = module.get<CancionesService>(CancionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
