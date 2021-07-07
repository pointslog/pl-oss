import { Test } from '@nestjs/testing';
import { MessageController } from './message.controller';

describe('MessageController', () => {
  const context = { loggingService: { log: jest.fn() } };
  const handler = { handle: jest.fn() };

  let controller: MessageController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: 'Context', useValue: context },
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

      expect(context.loggingService.log).toHaveBeenCalledTimes(1);
      expect(context.loggingService.log).toHaveBeenNthCalledWith(1, 'message', message);

      expect(handler.handle).toHaveBeenCalledTimes(1);
      expect(handler.handle).toHaveBeenNthCalledWith(1, message);
    });
  });
});
