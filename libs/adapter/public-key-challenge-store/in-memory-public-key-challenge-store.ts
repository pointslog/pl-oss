import {
  Challenge,
  PublicKey,
  PublicKeyChallengeMap,
  PublicKeyChallengeStore,
} from '@pl-oss/core';

export class InMemoryPublicKeyChallengeStore implements PublicKeyChallengeStore {
  constructor(private publicKeyChallengeMap: PublicKeyChallengeMap = {}) {}

  delete(publicKey: PublicKey): void {
    delete this.publicKeyChallengeMap[publicKey];
  }

  getById(publicKey: PublicKey): Challenge {
    return this.publicKeyChallengeMap[publicKey];
  }

  save(publicKey: PublicKey, challenge: Challenge): void {
    this.publicKeyChallengeMap[publicKey] = challenge;
  }
}
