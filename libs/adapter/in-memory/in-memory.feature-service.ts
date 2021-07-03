import { Feature, FeatureFlags, Runtime } from '@pl-oss/domain';

export class InMemoryFeatureService {
  constructor(
    private readonly featureFlags: FeatureFlags,
    private readonly runtime: Runtime,
  ) {}

  getAll(): Feature {
    return this.featureFlags[this.runtime];
  }
}
