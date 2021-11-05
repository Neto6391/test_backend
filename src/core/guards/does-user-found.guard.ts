import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DoesUserFoundGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    console.log("request-->", request.user, " params ", request.params.id);
    if (request.user) {
        if (request.user.id === parseInt(request.params.id)) {
          return true;
        }
        throw new ForbiddenException('Operacao nao permitida, somente o usuario logado na sessao pode realizar essa acao');
    }
    throw new NotFoundException('Usuario nao existe'); 
  }
}
