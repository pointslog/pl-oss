import {
  Challenge,
  PublicKey,
  PublicKeyChallengeMap,
  PublicKeyChallengeStore,
} from '@pl-oss/core';
import { ChallengeNotFoundException } from './challenge-not-found-exception';

export class InMemoryPublicKeyChallengeStore implements PublicKeyChallengeStore {
  constructor(private publicKeyChallengeMap: PublicKeyChallengeMap = {}) {}

  pop(publicKey: PublicKey): Challenge {
    const challenge = this.publicKeyChallengeMap[publicKey];
    if (!challenge) throw new ChallengeNotFoundException();
    delete this.publicKeyChallengeMap[publicKey];
    return challenge;
  }

  save(publicKey: PublicKey, challenge: Challenge): void {
    this.publicKeyChallengeMap[publicKey] = challenge;
  }
}
