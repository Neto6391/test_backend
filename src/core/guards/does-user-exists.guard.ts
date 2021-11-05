import { CanActivate, ConflictException, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class DoesUserExistsGuard implements CanActivate {
  constructor(
    private readonly userService: UserService
) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.userService.readByLogin(request.body.login);

    if (userExist) {
        throw new ConflictException('Usuario cadastrado!');
    }

    return true;
  }
}
