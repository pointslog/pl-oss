import { FeatureFlags, Runtime } from '@pl-oss/domain';

export class InMemoryFeatureService {
  constructor(
    private readonly features: FeatureFlags,
    private readonly runtime: Runtime,
  ) {}

  getAll() {
    return this.features[this.runtime];
  }
}
