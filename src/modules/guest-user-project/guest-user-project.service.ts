import { GuestUserProject, Project, User } from '.prisma/client';
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Console } from 'console';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateGuestUserProject } from './dto';

@Injectable()
export class GuestUserProjectService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(guestUserProjectData: CreateGuestUserProject): Promise<GuestUserProject> {
        const { userId, projectId } = guestUserProjectData;
        const userExist: User = await this.prismaService.user.findFirst({ where: { id: userId } });
        const projectExist: Project = await this.prismaService.project.findFirst({ where: { id: projectId } });

        if (!userExist) {
            throw new ForbiddenException("Usuario nao existe");
        }

        if (!projectExist) {
            throw new ForbiddenException("Projeto nao existe");
        }
        
        const projectAuthor: Project = await this.prismaService.project.findFirst({ where: { userId } });

        if (!projectAuthor) {
            const guestUserProject: GuestUserProject = await this.prismaService.guestUserProject.findFirst({ where: { projectId, userId } });
            if (!guestUserProject) {
                console.log(guestUserProject);
                return await this.prismaService.guestUserProject.create({ data: {...guestUserProjectData} });
            }
            throw new ForbiddenException("Usuario Ja convidado!");
        }
        throw new UnauthorizedException("Autor do projeto nao pode ser convidado!");
    }

    async update(guestUserProjectData: CreateGuestUserProject, guestId: number): Promise<GuestUserProject> {
        const { userId, projectId } = guestUserProjectData;

        const userExist: User = await this.prismaService.user.findFirst({ where: { id: userId } });
        const projectExist: Project = await this.prismaService.project.findFirst({ where: { id: projectId } });

        if (!userExist) {
            throw new ForbiddenException("Usuario nao existe");
        }

        if (!projectExist) {
            throw new ForbiddenException("Projeto nao existe");
        }

        const projectAuthorExist: Project = await this.prismaService.project.findFirst({ where: { userId } });
      
        if (!projectAuthorExist) {
            const guestUserProjectExist: GuestUserProject = await this.prismaService.guestUserProject.findFirst({ where: { projectId, userId } }); 
            if (!guestUserProjectExist || guestUserProjectExist.id === guestId) {
                return await this.prismaService.guestUserProject.update({ data: {...guestUserProjectData}, where: { id: guestId } });
            }
            throw new UnauthorizedException("Usuario Ja convidado!");
        }
        throw new UnauthorizedException("Autor do projeto nao pode ser convidado!");
    }

    async readByUserIdAndProjectId(userId: number, projectId: number): Promise<{guestUser: GuestUserProject }> {
        return {
            guestUser: await this.prismaService.guestUserProject.findFirst({ where: { userId, projectId } }),
        };
    }  

    async remove(guestId: number): Promise<GuestUserProject> {
        const projectAuthor: GuestUserProject = await this.prismaService.guestUserProject.findFirst({where: { id: guestId }});
        if (projectAuthor) {
            return await this.prismaService.guestUserProject.delete({ where: { id: guestId } });;
        }
        throw new NotFoundException("Registro de Convidado nao existe");
    }
}
