import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number | null => {
    const { user } = ctx.switchToHttp().getRequest();
    return user.sub || null;
  },
);
