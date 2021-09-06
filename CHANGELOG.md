## 0.0.81

- refactor: move logic to handle bigint in eventstore

## 0.0.80

- fix: bigint in mongo

## 0.0.79

- feat: metadata support in `EventLog`

## 0.0.78

- fix: nest event in `MongoDBEventLog`
- feat: add `id` in `Event`

## 0.0.77

- feat: add `IncorrectAggregateVersionException`

## 0.0.76

- feat: add `AllEventListener`

## 0.0.75

- feat: add `MongoDBEventLog`

## 0.0.74

- feat: add zip support

## 0.0.73

- feat: add authorization for metamask

## 0.0.72

- feat: add eth-jwt strategy and guard
- feat: add jimp utils
- refactor: eth-graphql-jwt-guard
- refactor: eth-graphql-auth-resolver

## 0.0.71

- add: GraphQLAuthResolver
- add: GraphQLBaseConstant
- add: GraphQLAuthGuard

## 0.0.70

- refactor: remove AggregateException
- refactor: MetamaskService interface
- refactor: remove nest logger
- refactor: remove command and handler
- refactor: remove message module

## 0.0.69

- refactor: public-key-challenge-store

## 0.0.68

- feat: add public-key-challenge-store and types
- feat: add graphql-jwt-auth-guard
- feat: add eth-auth-service

## 0.0.67

- fix: cheerio fetch import
- refactor: ambiguous file naming

## 0.0.66

- feat: add cheerio-service type and adapter
- refactor: rename uri.file-store to url.file-store
- refactor: export uri.file-store instance

## 0.0.65

- refactor: metamask plugin and guard

## 0.0.64

- feat: extension from mime type preferred

## 0.0.63

- refactor: set `environment` optional in `Context`

## 0.0.62

- refactor: add `environment` method to `Context`

## 0.0.61

- refactor: add `determineExtension` method to `FileEntityHelper`

## 0.0.60

- refactor: remove `query` and `query-handler`
- refactor: rename `domain` to `core`

## 0.0.59

- fix: add `S3FileStore`

## 0.0.58

- fix: add `node-fetch` dependency

## 0.0.57

- feat(adapter): add URI FileStore
- refactor(adapters): rearranged
- refactor(file-context): remove file-context
- feat(domain): add UnimplementedException

## 0.0.56

- fix: `$ether` to `$metamask` in Vue Plugin

## 0.0.55

- feat(vue): add metamask-plugin and metamask-guard
- remove: `EthersPlugin` and `EthersGuard`
- remove: `ethers.js` dependency

## 0.0.54

- feat: add file-context lib

## 0.0.53

- feat(vue): add ethers-plugin and ethers-guard

## 0.0.52

- refactor: `Aggregate`

## 0.0.51

- refactor: `Aggregate`

## 0.0.50

- refactor: `Aggregate`

---

## 0.0.49

- remove: `AggregateRepository`

---

## 0.0.48

- add: `asyncIterator` to `GraphQLService`

---

## 0.0.47

- fix: remove `PubSub` dep

---

## 0.0.46

- fix: extend `pl-textarea-form` style and class

---

## 0.0.45

- feat: add `pl-textarea`
- feat: add `pl-textarea-form`

---

## 0.0.44

- feat: default prop in `pl-list-card`

---

## 0.0.43

- fix: typo in `graphQLService`

---

## 0.0.42

- feat: add `slot` in `pl-text-form`
- feat: add `slot` in `pl-file-form`
- feat: add `graphQlService` in context

---

## 0.0.41

- feat: use `LoggingService` in message module
- fix: `timestamp: string` in Event
- refactor: rename `LoggerService` to `LoggingService`
- refactor: rename `MongoDBLoggerService` to `MongoDBLoggingService`

---

## 0.0.40

- add `timestamp` to `Query` and `Command`
- add `getStreamNamePrefx` to `Aggregate`
- add `getStreamNamePrefixes` to `EventListener`
- fix `pl-file-form` #66

---

## 0.0.39

- stale release

---

## 0.0.38

- fix `InMemoryFeatureService` adapter inheritance

---

## 0.0.37

- add `Feature`, `FeatureFlags` and `Runtime` types
- add `FeatureService` interface
- add `InMemoryFeatureService` adapter
- add `Context` interface

---

## 0.0.36

- add `MongoDBLoggerService`

---

## 0.0.35

- add `LoggerService`

---

## 0.0.34

- fix `data` nesting in `EventStoreDBEventSubscription`

---

## 0.0.33

- fix `data` nesting in `EventStoreDBEventStore`

---

## 0.0.32

- add `by: string` in `Command`
- add `by: string` in `Query`

---

## 0.0.31

- change: `Event`

---

## 0.0.30

- add: `pl-list-card`
- remove: `DomainContext`

---

## 0.0.29

### Changed
- `Event`

---

## 0.0.28

### Changed
- `MessageModule`

---

## 0.0.27

### Added
- `MessageModule`

---

## 0.0.26

### Added
- `HandlerMap`
- `MessageController`

---

## 0.0.25

### Added
- `pl-file-form`

---

## 0.0.24

### Added
- `MongoDBHelper`

---

## 0.0.23

### Changed
- Auth0 Guard
- Auth0 Plugin

---

## 0.0.22

### Added
- `AppContext`
- Auth0 Guard
- Auth0 Plugin

---

## 0.0.21

### Changed
- Cleaned redundant hierarchy in `adapter`, `domain`, and `vue` packages.

---

## 0.0.20

### Changed
- Package `domain-core` renamed to `domain`
- Package `vue-core` renamed to `vue`

---

## 0.0.19

### Changed
- `domain-context` now has an `aggregateRepositoryMap` as well.

---

## 0.0.18

### Added
- `pl-plus-fab`

---

## 0.0.17

### Added
- `pl-text-form`

---

## 0.0.16

### Changed
- `pl-done-btn`
