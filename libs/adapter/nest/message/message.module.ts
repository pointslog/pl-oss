import { DynamicModule, Logger, Module } from '@nestjs/common';
import { Context, HandlerMap } from '@pl-oss/domain';
import { MessageController } from './message.controller';

@Module({ controllers: [MessageController], providers: [Logger] })
export class MessageModule {
  static register(context: Context, handlerMap: HandlerMap): DynamicModule {
    const providers = [
      { provide: 'Context', useValue: context },
      { provide: 'HandlerMap', useValue: handlerMap },
    ];
    return { module: MessageModule, providers };
  }
}
