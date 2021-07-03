import { LoggerService } from './logger-service';
import { FeatureService } from './feature-service';

export interface Context {
  featureService?: FeatureService
  loggerService?: LoggerService,
}
