import { Inject, UnauthorizedException } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Context, EthAuthService, PublicKeyChallengeStore } from '@pl-oss/core';
import { GraphQLBaseConstant } from './graphql-base-constant';

export class EthGraphQLAuthResolver {
  private readonly ethAuthService: EthAuthService;
  private readonly publicKeyChallengeStore: PublicKeyChallengeStore;

  constructor(
    @Inject('Context') context: Context,
    private readonly jwtService: JwtService,
  ) {
    this.ethAuthService = context.ethAuthService;
    this.publicKeyChallengeStore = context.publicKeyChallengeStore;
  }

  @Mutation(GraphQLBaseConstant.RETURN_STRING)
  async generateAccessToken(
    @Args('signedMessage') signedMessage: string,
    @Args('walletAddress') walletAddress: string,
  ): Promise<string> {
    const unsignedMessage = this.publicKeyChallengeStore.pop(walletAddress);
    const recoveredWalletAddress = this.ethAuthService.recoverWalletAddress(signedMessage, unsignedMessage);
    if (recoveredWalletAddress === walletAddress) return this.jwtService.sign({ sub: walletAddress });
    throw new UnauthorizedException();
  }

  @Mutation(GraphQLBaseConstant.RETURN_STRING)
  async generateAuthMessage(@Args('walletAddress') walletAddress: string): Promise<string> {
    const authMessage = this.ethAuthService.generateMessage();
    this.publicKeyChallengeStore.save(walletAddress, authMessage);
    return authMessage;
  }
}
