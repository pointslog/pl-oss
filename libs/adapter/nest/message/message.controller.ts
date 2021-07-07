import {
  Body, Controller, HttpCode, HttpStatus, Inject, Post,
} from '@nestjs/common';
import {
  Command, Context, HandlerMap, Query,
} from '@pl-oss/domain';

type Message = Command | Query;

@Controller()
export class MessageController {
  constructor(
    @Inject('Context') private readonly context: Context,
    @Inject('HandlerMap') private readonly handlerMap: HandlerMap,
  ) {}

  @Post('message')
  @HttpCode(HttpStatus.OK)
  async postMessage(@Body() message: Message) {
    await this.context.loggingService.log('message', message);
    return this.execute(message);
  }

  private async execute(message: Message) {
    const handler = this.handlerMap[message.type];
    if (!handler) throw new Error('handler.does-not-exist');
    return handler.handle(message);
  }
}
