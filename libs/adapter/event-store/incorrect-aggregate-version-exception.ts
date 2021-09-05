export class IncorrectAggregateVersionException extends Error {
  constructor(
    readonly actualVersion: bigint,
    readonly expectedVersion: bigint,
    readonly streamName: string,
    readonly rawError: unknown,
  ) {
    super('exception.incorrect-aggregate-version');
    this.name = 'IncorrectAggregateVersionException';
  }
}
