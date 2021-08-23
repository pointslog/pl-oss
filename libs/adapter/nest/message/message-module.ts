import { DynamicModule, Module } from '@nestjs/common';
import { Context, HandlerMap } from '@pl-oss/core';
import { MessageController } from './message-controller';

@Module({ controllers: [MessageController] })
export class MessageModule {
  static register(context: Context, handlerMap: HandlerMap): DynamicModule {
    const providers = [
      { provide: 'Context', useValue: context },
      { provide: 'HandlerMap', useValue: handlerMap },
    ];
    return { module: MessageModule, providers };
  }
}
