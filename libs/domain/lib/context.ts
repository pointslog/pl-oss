import { FeatureService } from './feature-service';
import { LoggingService } from './logging-service';

export interface Context {
  featureService?: FeatureService
  loggerService?: LoggingService,
}
