import { Test, TestingModule } from '@nestjs/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let provider: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();

    provider = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
