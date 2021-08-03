import { Feature } from './feature';
import { Runtime } from './runtime';

export type FeatureFlags = Record<Runtime, Feature>;
