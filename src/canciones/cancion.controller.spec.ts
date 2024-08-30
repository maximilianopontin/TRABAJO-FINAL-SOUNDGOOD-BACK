import { Test, TestingModule } from '@nestjs/testing';
import { CancionesController } from './cancion.controller';
import { CancionesService } from './cancion.service';

describe('CancionesController', () => {
  let controller: CancionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancionesController],
      providers: [CancionesService],
    }).compile();

    controller = module.get<CancionesController>(CancionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
