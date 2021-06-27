import { Test } from '@nestjs/testing';
import { MessageController } from './message.controller';

describe('MessageController', () => {
  const handler = { handle: jest.fn() };
  const logger = { log: jest.fn() };

  let controller: MessageController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: 'HandlerMap', useValue: { Test: handler } },
        { provide: 'Logger', useValue: logger },
      ],
    }).compile();

    controller = module.get(MessageController);
  });

  afterEach(jest.clearAllMocks);

  describe('postMessage', () => {
    it('should call handle of handler', async () => {
      const message = { type: 'Test' };
      await controller.postMessage(message);

      expect(logger.log).toHaveBeenCalledTimes(1);
      expect(logger.log).toHaveBeenNthCalledWith(1, message);

      expect(handler.handle).toHaveBeenCalledTimes(1);
      expect(handler.handle).toHaveBeenNthCalledWith(1, message);
    });
  });
});
