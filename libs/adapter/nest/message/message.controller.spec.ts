import { Test } from '@nestjs/testing';
import { MessageController } from './message.controller';

describe('MessageController', () => {
  const handler = { handle: jest.fn() };
  const loggingService = { log: jest.fn() };

  let controller: MessageController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: 'Context', useValue: { loggingService } },
        { provide: 'HandlerMap', useValue: { Test: handler } },
      ],
    }).compile();

    controller = module.get(MessageController);
  });

  afterEach(jest.clearAllMocks);

  describe('postMessage', () => {
    it('should call handle of handler', async () => {
      const message = { type: 'Test', by: 'by', timestamp: 'timestamp' };
      await controller.postMessage(message);

      expect(loggingService.log).toHaveBeenCalledTimes(1);
      expect(loggingService.log).toHaveBeenNthCalledWith(1, 'message', message);

      expect(handler.handle).toHaveBeenCalledTimes(1);
      expect(handler.handle).toHaveBeenNthCalledWith(1, message);
    });
  });
});
