import { Project } from '.prisma/client';
import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/modules/project/project.service';

@Injectable()
export class DoesUserEditOrDeleteProjectGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userIdJwtToken = request.user.id;
    const projectExists: { project: Project } = await this.projectService.readById(parseInt(request.params.id), null);

    if (!projectExists) {
      throw new NotFoundException("Projeto nao existe!");
    }

    if (projectExists?.project.userId !== userIdJwtToken) {
      throw new UnauthorizedException('Operacao nao permitida, somente o usuario logado na sessao pode realizar essa acao');
    }
    
    return true;
  }
}
