import { AuthMessageStore } from './auth-message-store';
import { Environment } from './environment';
import { EventStore } from './event-store';
import { FeatureService } from './feature-service';
import { FileStore } from './file-store';
import { GraphQLService } from './graphql-service';
import { LoggingService } from './logging-service';

export interface Context {
  authMessageStore?: AuthMessageStore;
  environment?: Environment;
  eventStore?: EventStore;
  featureService?: FeatureService;
  fileStore?: FileStore;
  graphQLService?: GraphQLService;
  loggingService?: LoggingService;
}
