import {
  Feature,
  FeatureFlags,
  FeatureService,
  Runtime,
} from '@pl-oss/domain';

export class InMemoryFeatureService implements FeatureService {
  constructor(
    private readonly featureFlags: FeatureFlags,
    private readonly runtime: Runtime,
  ) {}

  getAll(): Feature {
    return this.featureFlags[this.runtime];
  }
}
