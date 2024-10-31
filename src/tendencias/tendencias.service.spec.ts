import { Test, TestingModule } from '@nestjs/testing';
import { TendenciasService } from './tendencias.service';

describe('TendenciasService', () => {
  let service: TendenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TendenciasService],
    }).compile();

    service = module.get<TendenciasService>(TendenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
