import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EthGraphQLJwtGuard extends AuthGuard('eth-jwt') {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext
      .create(context)
      .getContext()
      .req;
  }
}
