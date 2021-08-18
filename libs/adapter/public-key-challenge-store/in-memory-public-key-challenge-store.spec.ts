import { InMemoryPublicKeyChallengeStore } from './in-memory-public-key-challenge-store';

describe('InMemoryPublicKeyChallengeStore', () => {
  let store: InMemoryPublicKeyChallengeStore;

  beforeEach(() => {
    store = new InMemoryPublicKeyChallengeStore({ publicKey: 'challenge' });
  });

  afterEach(jest.clearAllMocks);

  describe('delete', () => {
    it('should delete challenge for existing publicKey', () => {
      store.delete('publicKey');
      const challenge = store.getById('publicKey');
      expect(challenge).toBe(undefined);
    });
  });

  describe('getById', () => {
    it('should return challenge for existing publicKey', () => {
      const challenge = store.getById('publicKey');
      expect(challenge).toBe('challenge');
    });
  });

  describe('save', () => {
    it('should add new challenge for publicKey', () => {
      store.save('newPublicKey', 'newChallenge');

      const oldChallenge = store.getById('publicKey');
      const newChallenge = store.getById('newPublicKey');

      expect(oldChallenge).toBe('challenge');
      expect(newChallenge).toBe('newChallenge');
    });

    it('should update existing challenge for publicKey', () => {
      store.save('publicKey', 'newChallenge');
      const newChallenge = store.getById('publicKey');
      expect(newChallenge).toBe('newChallenge');
    });
  });
});
