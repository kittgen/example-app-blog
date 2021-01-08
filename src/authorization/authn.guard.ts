import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

// TODO: dummy implementation to get user on request
@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // attach authorized user information to request
    request.user = new User(request.query.userId);
    //return request.user.id !== undefined;
    return true;
  }
}
