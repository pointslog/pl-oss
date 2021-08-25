import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EthJwtGuard extends AuthGuard('eth-jwt') {}
