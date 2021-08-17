import { InMemoryAuthMessageStore } from './in-memory-auth-message-store';

describe('InMemoryAuthMessageStore', () => {
  let store: InMemoryAuthMessageStore;

  beforeEach(() => {
    store = new InMemoryAuthMessageStore({ address: 'message' });
  });

  afterEach(jest.clearAllMocks);

  describe('delete', () => {
    it('should delete message for existing walletAddress', () => {
      store.delete('address');
      const message = store.getByWalletAddress('address');
      expect(message).toBe(undefined);
    });
  });

  describe('getByWalletAddress', () => {
    it('should return message for existing walletAddress', () => {
      const message = store.getByWalletAddress('address');
      expect(message).toBe('message');
    });
  });

  describe('save', () => {
    it('should add new AuthMessage to existing AuthMessages', () => {
      store.save('newAddress', 'newMessage');

      const oldMessage = store.getByWalletAddress('address');
      const newMessage = store.getByWalletAddress('newAddress');

      expect(oldMessage).toBe('message');
      expect(newMessage).toBe('newMessage');
    });

    it('should update existing AuthMessage', () => {
      store.save('address', 'newMessage');
      const newMessage = store.getByWalletAddress('address');
      expect(newMessage).toBe('newMessage');
    });
  });
});
