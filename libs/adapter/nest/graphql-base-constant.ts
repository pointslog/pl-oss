import { Int } from '@nestjs/graphql';

export class GraphQLBaseConstant {
  static DONE = 'done';
  static RETURN_BOOLEAN = () => Boolean;
  static RETURN_INT = () => Int;
  static RETURN_STRING = () => String;
}
