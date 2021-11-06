import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { DoesIsUserGuestLevelReadGuard } from 'src/core/guards/does-is-user-guest-level-read.guard';
import { DoesIsUserGuestLevelWriteGuard } from 'src/core/guards/does-is-user-guest-level-write.guard';
import { DoesUserDeletedGuard } from 'src/core/guards/does-user-deleted.guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto';

@Controller('documents')
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ) {}

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard, DoesIsUserGuestLevelWriteGuard)
    @Post(":projectId")
    async create(
        @Param('projectId') projectId: string, 
        @Body() createDocumentDto: CreateDocumentDto
    ) {
        return await this.documentService.create(
            Object.assign({}, {...createDocumentDto}, { projectId: parseInt(projectId) })
        );
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard, DoesIsUserGuestLevelWriteGuard)
    @Put(":projectId/:documentId")
    async update(
        @Param('projectId') projectId: string,
        @Param('documentId') documentId: string,
        @Body() createDocumentDto: CreateDocumentDto
    ) {
        return await this.documentService.update(
            Object.assign({}, {...createDocumentDto}, { projectId: parseInt(projectId) }),
            parseInt(documentId)
        );
    }
    
    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard, DoesIsUserGuestLevelWriteGuard)
    @Delete(":projectId/:documentId")
    async delete(
        @Param('projectId') projectId: string,
        @Param('documentId') documentId: string,
    ) {
        return await this.documentService.softDelete(
            parseInt(projectId),
            parseInt(documentId)
        );
    }

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard, DoesIsUserGuestLevelReadGuard)
    @Get(":projectId/:documentId")
    async getOne(
        @Param('projectId') projectId: string,
        @Param('documentId') documentId: string,
    ) {
        return await this.documentService.readOne(
            parseInt(projectId),
            parseInt(documentId)
        );
    }   

    @UseGuards(JwtAuthGuard,
        DoesUserDeletedGuard, DoesIsUserGuestLevelReadGuard)
    @Get(":projectId")
    async getAll(
        @Param('projectId') projectId: string,
    ) {
        return await this.documentService.readAll(
            parseInt(projectId),
        );
    }
}
