import { Test, TestingModule } from '@nestjs/testing';
import { PaketController } from './paket.controller';
import { PaketService } from './paket.service';

describe('PaketController', () => {
  let controller: PaketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaketController],
      providers: [PaketService],
    }).compile();

    controller = module.get<PaketController>(PaketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
