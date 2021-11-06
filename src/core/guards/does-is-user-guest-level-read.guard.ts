import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GuestUserProject } from '@prisma/client';
import { Observable } from 'rxjs';
import { GuestUserProjectService } from 'src/modules/guest-user-project/guest-user-project.service';
import { ProjectService } from 'src/modules/project/project.service';

@Injectable()
export class DoesIsUserGuestLevelReadGuard implements CanActivate {
  constructor(
    private readonly guestUserProjectService: GuestUserProjectService,
    private readonly projectService: ProjectService
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const projectIdParam = request.params.projectId;
    const userIdToken = request.user.id;
    const guestUser: { guestUser: GuestUserProject } = await this.guestUserProjectService.readByUserIdAndProjectId(parseInt(userIdToken), parseInt(projectIdParam));
    
    if (!guestUser.guestUser) {
      if(await this.projectService.isAuthor(parseInt(userIdToken))) {
        return true;
      }
      throw new NotFoundException("Usuario nao existente/Usuario nao tem permissao para criar documento nesse projeto");
    }
    
    if (guestUser.guestUser.levelAccess !== "READ") {
      throw new UnauthorizedException("Usuario convidado nao possui o nivel de acesso permitido!");
    }
    return true;
  }
}
