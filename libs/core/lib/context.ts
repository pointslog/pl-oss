import { Environment } from './environment';
import { EventStore } from './event-store';
import { FeatureService } from './feature-service';
import { FileStore } from './file-store';
import { GraphQLService } from './graphql.service';
import { LoggingService } from './logging-service';

export interface Context {
  environment?: Environment;
  eventStore?: EventStore;
  featureService?: FeatureService;
  fileStore?: FileStore;
  graphQLService?: GraphQLService;
  loggingService?: LoggingService;
}
