export class ChallengeNotFoundException extends Error {
  constructor() {
    super('exception.challenge.not-found');
    this.name = 'ChallengeNotFoundException';
  }
}
