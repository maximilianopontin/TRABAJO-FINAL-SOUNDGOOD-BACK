import { Test, TestingModule } from '@nestjs/testing';
import { TendenciasController } from './tendencias.controller';
import { TendenciasService } from './tendencias.service';

describe('TendenciasController', () => {
  let controller: TendenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TendenciasController],
      providers: [TendenciasService],
    }).compile();

    controller = module.get<TendenciasController>(TendenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
