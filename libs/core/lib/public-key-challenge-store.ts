export type PublicKey = string;
export type Challenge = string;
export type PublicKeyChallengeMap = Record<PublicKey, Challenge>;

export interface PublicKeyChallengeStore {
  delete(publicKey: PublicKey): void;
  getById(publicKey: PublicKey): Challenge;
  save(publicKey: PublicKey, challenge: Challenge): void;
}
