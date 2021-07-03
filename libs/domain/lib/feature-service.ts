import { FeatureFlags } from './feature-flags';

export interface FeatureService {
  getAll(): FeatureFlags;
}
