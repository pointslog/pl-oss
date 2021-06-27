import {
  Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post,
} from '@nestjs/common';
import { Command, HandlerMap, Query } from '@pl-oss/domain';

type Message = Command | Query;

@Controller()
export class MessageController {
  constructor(
    @Inject('HandlerMap') private readonly handlerMap: HandlerMap,
    @Inject('Logger') private readonly logger: Logger,
  ) {}

  @Post('message')
  @HttpCode(HttpStatus.OK)
  postMessage(@Body() message: Message) {
    this.logger.log(message);
    return this.execute(message);
  }

  private async execute(message: Message) {
    const handler = this.handlerMap[message.type];
    if (!handler) throw new Error('handler.does-not-exist');
    return handler.handle(message);
  }
}
