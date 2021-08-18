import { Environment } from './environment';
import { EthAuthService } from './eth-auth-service';
import { EventStore } from './event-store';
import { FeatureService } from './feature-service';
import { FileStore } from './file-store';
import { GraphQLService } from './graphql-service';
import { LoggingService } from './logging-service';
import { PublicKeyChallengeStore } from './public-key-challenge-store';

export interface Context {
  environment?: Environment;
  ethAuthService?: EthAuthService;
  eventStore?: EventStore;
  featureService?: FeatureService;
  fileStore?: FileStore;
  graphQLService?: GraphQLService;
  loggingService?: LoggingService;
  publicKeyChallengeStore?: PublicKeyChallengeStore;
}
