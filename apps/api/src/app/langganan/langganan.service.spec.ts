import { Test, TestingModule } from '@nestjs/testing';
import { LanggananService } from './langganan.service';

describe('LanggananService', () => {
  let service: LanggananService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanggananService],
    }).compile();

    service = module.get<LanggananService>(LanggananService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
