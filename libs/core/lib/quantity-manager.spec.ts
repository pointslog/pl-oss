import { ItemDoesNotExistException } from './item-does-not-exist-exception';
import { InvalidItemQuantityException } from './invalid-item-quantity-exception';
import { QuantityManager } from './quantity-manager';

const itemAId = 'item-a';
const itemBId = 'item-b';
const quantity10 = 10;
const quantity20 = 20;

describe('QuantityManager', () => {
  let manager: QuantityManager;

  beforeEach(() => {
    manager = new QuantityManager();
  });

  afterEach(jest.clearAllMocks);

  describe('add', () => {
    it('should add item', () => {
      manager.add(itemAId, quantity10);
      expect(manager.has(itemAId)).toStrictEqual(true);
    });

    it('should update item quantity', () => {
      manager.add(itemAId, quantity10);
      manager.add(itemAId, quantity20);

      expect(manager.getQuantity(itemAId)).toStrictEqual(quantity10 + quantity20);
    });
  });

  describe('getQuantity', () => {
    it('should return item quantity', () => {
      manager.add(itemAId, quantity10);
      expect(manager.getQuantity(itemAId)).toStrictEqual(quantity10);
    });

    it('should throw ItemDoesNotExistException', () => {
      expect(manager.getQuantity.bind(manager, itemBId))
        .toThrowError(new ItemDoesNotExistException(itemBId));
    });
  });

  describe('has', () => {
    it('should return true', () => {
      manager.add(itemAId, quantity10);
      expect(manager.has(itemAId)).toBeTruthy();
    });

    it('should return false', () => {
      manager.add(itemBId, quantity10);
      expect(manager.has(itemAId)).toBeFalsy();
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity', () => {
      manager.add(itemAId, quantity10);
      manager.updateQuantity(itemAId, quantity20);

      expect(manager.getQuantity(itemAId)).toStrictEqual(quantity20);
    });

    it('should throw ItemDoesNotExistException', () => {
      expect(manager.updateQuantity.bind(manager, itemAId, quantity20))
        .toThrowError(new ItemDoesNotExistException(itemAId));
    });
  });

  describe('remove', () => {
    it('should remove item', () => {
      manager.add(itemAId, quantity10);
      manager.remove(itemAId);

      expect(manager.has(itemAId)).toBeTruthy();
      expect(manager.getQuantity(itemAId)).toStrictEqual(quantity10 - 1);
    });

    it('should throw ItemDoesNotExistException', () => {
      expect(manager.remove.bind(manager, itemAId))
        .toThrowError(new ItemDoesNotExistException(itemAId));
    });
  });

  describe('removeByQuantity', () => {
    it('should removeByQuantity', () => {
      manager.add(itemAId, quantity10);
      manager.removeByQuantity(itemAId, 2);

      expect(manager.has(itemAId)).toBeTruthy();
      expect(manager.getQuantity(itemAId)).toStrictEqual(quantity10 - 2);
    });

    it('should throw ItemDoesNotExistException', () => {
      expect(manager.removeByQuantity.bind(manager, itemAId))
        .toThrowError(new ItemDoesNotExistException(itemAId));
    });

    it('should throw ItemDoesNotExistException', () => {
      const quantityToRemove = quantity10 + 2;
      manager.add(itemAId, quantity10);

      expect(manager.removeByQuantity.bind(manager, itemAId, quantityToRemove))
        .toThrowError(new InvalidItemQuantityException(itemAId, quantityToRemove));
    });

    it('should delete item', () => {
      manager.add(itemAId, quantity10);
      manager.removeByQuantity(itemAId, quantity10);

      expect(manager.has(itemAId)).toBeFalsy();
    });
  });
});
