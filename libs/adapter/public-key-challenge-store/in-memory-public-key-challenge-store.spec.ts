import { ChallengeNotFoundException } from './challenge-not-found-exception';
import { InMemoryPublicKeyChallengeStore } from './in-memory-public-key-challenge-store';

describe('InMemoryPublicKeyChallengeStore', () => {
  let store: InMemoryPublicKeyChallengeStore;

  beforeEach(() => {
    store = new InMemoryPublicKeyChallengeStore();
  });

  afterEach(jest.clearAllMocks);

  describe('pop', () => {
    it('should return challenge for existing publicKey', () => {
      store.save('publicKey', 'challenge');
      const result = store.pop('publicKey');
      expect(result).toStrictEqual('challenge');
    });

    it('should throw ChallengeNotFoundException when challenge not found for publicKey', () => {
      expect(store.pop.bind(store, 'publicKey'))
        .toThrowError(new ChallengeNotFoundException());
    });
  });

  describe('save', () => {
    it('should add new challenge for publicKey', () => {
      store.save('publicKey', 'challenge');
      const result = store.pop('publicKey');
      expect(result).toStrictEqual('challenge');
    });

    it('should update existing challenge for publicKey', () => {
      store.save('publicKey', 'oldChallenge');
      store.save('publicKey', 'newChallenge');

      const result = store.pop('publicKey');
      expect(result).toStrictEqual('newChallenge');
    });
  });
});
