import { Test, TestingModule } from '@nestjs/testing';
import { PaketService } from './paket.service';

describe('PaketService', () => {
  let service: PaketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaketService],
    }).compile();

    service = module.get<PaketService>(PaketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
