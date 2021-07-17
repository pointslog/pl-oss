import { EventStore } from './event-store';
import { FeatureService } from './feature-service';
import { GraphQLService } from './graphql.service';
import { LoggingService } from './logging-service';

export interface Context {
  eventStore?: EventStore,
  featureService?: FeatureService,
  graphQLService?: GraphQLService,
  loggingService?: LoggingService,
}
