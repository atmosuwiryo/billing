import { Test, TestingModule } from '@nestjs/testing';
import { LanggananController } from './langganan.controller';
import { LanggananService } from './langganan.service';

describe('LanggananController', () => {
  let controller: LanggananController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanggananController],
      providers: [LanggananService],
    }).compile();

    controller = module.get<LanggananController>(LanggananController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
