export class IncorrectAggregateVersionException extends Error {
  constructor(
    readonly actualVersion: bigint,
    readonly expectedVersion: bigint,
    readonly streamName: string,
    readonly rawError: unknown,
  ) {
    super(JSON.stringify({ 
      actualVersion, 
      expectedVersion, 
      streamName, 
      rawError, 
      type: 'exception.incorrect-aggregate-version',
    }));
    this.name = 'IncorrectAggregateVersionException';
  }
}
