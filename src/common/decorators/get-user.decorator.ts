import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//CUSTOM DECORATOR TO EXTRACT USER FROM REQ
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
