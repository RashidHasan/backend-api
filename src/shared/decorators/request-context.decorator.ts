import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestContextHolder } from '../context/request-context-holder';

export const RequestContextParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return RequestContextHolder.getContextOrThrow();
  },
);
