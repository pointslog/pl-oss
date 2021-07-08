import { PubSub } from 'graphql-subscriptions';
import { FeatureService } from './feature-service';
import { LoggingService } from './logging-service';

export interface Context {
  featureService?: FeatureService,
  graphQlService?: PubSub,
  loggingService?: LoggingService,
}
