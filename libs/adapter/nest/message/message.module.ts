import { DynamicModule, Logger, Module } from '@nestjs/common';
import { HandlerMap } from '@pl-oss/domain';
import { MessageController } from './message.controller';

@Module({
  controllers: [MessageController],
  providers: [Logger],
})
export class AppModule {
  static register(handlerMap: HandlerMap): DynamicModule {
    const providers = [{ provide: 'HandlerMap', useValue: handlerMap }];
    return { module: AppModule, providers };
  }
}
