import { Test, TestingModule } from '@nestjs/testing';
import { EthJwtStrategy } from './eth-jwt-strategy';

describe('EthJwtStrategy', () => {
  let strategy: EthJwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EthJwtStrategy,
        { provide: 'Context', useValue: { environment: { jwtSecret: 'secret' } } },
      ],
    }).compile();

    strategy = module.get(EthJwtStrategy);
  });

  afterEach(jest.resetAllMocks);

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate', async () => {
    const payload = { sub: 'address' };
    const result = await strategy.validate(payload);
    expect(result).toStrictEqual({ walletAddress: 'address' });
  });
});
