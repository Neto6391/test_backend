import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DoesUserDeletedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (request.user) {
      if (!request.user.isDeleted) {
        return true;
      }
    
      throw new NotFoundException('Usuario nao existe'); 
        
    }
    throw new NotFoundException('Usuario nao existe'); 
  }
}
