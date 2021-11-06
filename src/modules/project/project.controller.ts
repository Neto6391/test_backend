import { Body, Controller, Post, UseGuards, Request, Put, Param, Delete, Get } from '@nestjs/common';
import { DoesUserDeletedGuard } from 'src/core/guards/does-user-deleted.guard';
import { DoesUserEditOrDeleteProjectGuard } from 'src/core/guards/does-user-edit-or-delete-project.guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CreateGuestUserProject } from '../guest-user-project/dto';
import { GuestUserProjectService } from '../guest-user-project/guest-user-project.service';
import { CreateProjectDto } from './dto';

import { ProjectService } from './project.service';


@Controller('projects')
export class ProjectController {

    constructor(
        private readonly projectService: ProjectService,
        private readonly guestUserProjectService: GuestUserProjectService
    ) {}

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard)
    @Post()
    async createProject(@Request() req, @Body() createProjectDto: CreateProjectDto) {
        const userId = req.user.id;
        return await this.projectService.create(Object.assign({}, {...createProjectDto}, { userId }));
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard, DoesUserEditOrDeleteProjectGuard)
    @Put(":id")
    async updateProject(@Param("id") projectId: string,  @Request() req, @Body() createProjectDto: CreateProjectDto) {
        const userId = req.user.id;
        return await this.projectService.update(Object.assign({}, {...createProjectDto}, { userId }), parseInt(projectId));
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard)
    @Get()
    async getAllProjects() {
        return await this.projectService.readAll();
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard)
    @Get(":id")
    async getOneProject(@Param("id") projectId: string) {
        return await this.projectService.readById(parseInt(projectId), false);
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard, DoesUserEditOrDeleteProjectGuard)
    @Delete(":id")
    async deleteProject(@Param("id") projectId: string) {
        return await this.projectService.softDelete(parseInt(projectId));
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard)
    @Post("guest-project")
    async createUserGuestProject(@Body() createGuestUserProject: CreateGuestUserProject) {
        return this.guestUserProjectService.create(createGuestUserProject);
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard)
    @Put("guest-project/:id")
    async updateUserGuestProject(@Param("id") idUserGuestProject: string,  @Body() createGuestUserProject: CreateGuestUserProject) {
        return await this.guestUserProjectService.update(createGuestUserProject, parseInt(idUserGuestProject));
    }


    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard)
    @Delete("guest-project/:id")
    async removeUserGuestProject(@Param("id") idUserGuestProject: string, @Body() createGuestUserProject: CreateGuestUserProject) {
        return this.guestUserProjectService.remove(parseInt(idUserGuestProject));
    }
}
