import { Test, TestingModule } from '@nestjs/testing';
import { GuestUserProjectService } from './guest-user-project.service';

describe('GuestUserProjectService', () => {
  let service: GuestUserProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestUserProjectService],
    }).compile();

    service = module.get<GuestUserProjectService>(GuestUserProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
