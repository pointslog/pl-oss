import { FeatureService } from './feature-service';
import { LoggerService } from './logger-service';

export interface Context {
  featureService?: FeatureService
  loggerService?: LoggerService,
}
