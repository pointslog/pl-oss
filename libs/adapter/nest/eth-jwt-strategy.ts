import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Context } from '@pl-oss/core';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  aud?: string[];
  azp?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  scope?: string;
  sub?: string;
}

@Injectable()
export class EthJwtStrategy extends PassportStrategy(Strategy, 'eth-jwt') {
  constructor(@Inject('Context') context: Context) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: context.environment.jwtSecret.toString(),
    });
  }

  async validate(payload: JwtPayload) {
    return { walletAddress: payload.sub };
  }
}
