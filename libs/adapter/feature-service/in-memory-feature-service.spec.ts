import { FeatureFlags } from '@pl-oss/core';
import { InMemoryFeatureService } from './in-memory-feature-service';

describe('InMemoryFeatureService', () => {
  let service: InMemoryFeatureService;

  describe('getAll', () => {
    it('should return features for given runtime', () => {
      const flags: FeatureFlags = {
        development: {},
        staging: {},
        production: {},
      };

      service = new InMemoryFeatureService(flags, 'development');
      expect(service.getAll()).toMatchObject(flags.development);

      service = new InMemoryFeatureService(flags, 'staging');
      expect(service.getAll()).toMatchObject(flags.staging);

      service = new InMemoryFeatureService(flags, 'production');
      expect(service.getAll()).toMatchObject(flags.production);
    });
  });
});
