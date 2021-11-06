import { Document } from '@prisma/client';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateDocumentDto, DocumentDto } from './dto';

@Injectable()
export class DocumentService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(createDocument: DocumentDto): Promise<{ document: Document }> {
        const projectExist = await this.prismaService.project.findFirst({where: { id: createDocument.projectId, isDeleted: false }});
        if (!projectExist) {
            throw new NotFoundException("Projeto nao existe");
        }
        return {
            document: await this.prismaService.document.create({ data: {...createDocument} }),
        };
    }

    async update(createDocument: DocumentDto, documentId: number): Promise<{ document: Document }> {
        const projectExist = await this.prismaService.project.findFirst({where: { id: createDocument.projectId, isDeleted: false }});
        const documentExist = await this.prismaService.document.findFirst({ where: { id: documentId, isDeleted: false } });
        if (!projectExist) {
            throw new NotFoundException("Projeto nao existe");
        }
        if (!documentExist) {
            throw new NotFoundException("Documento nao existe");
        }

        return {
            document: await this.prismaService.document.update({ data: {...createDocument}, where: { id: documentId } }),
        };
    }

    async readOne(projectId: number, documentId: number): Promise<{ document: Document }> {
        const document: Document = await this.prismaService.document.findFirst({ where: { id: documentId, projectId, isDeleted: false } });
        if (!document) {
            throw new NotFoundException("Documento nao existe");
        }
        return { document };
    }

    async readAll(projectId: number): Promise<{ documents: Document[] }> {
        const documents: Document[] = await this.prismaService.document.findMany({ where: { projectId, isDeleted: false } });
        if (!documents ) {
            throw new NotFoundException("Documento nao existe nesse Projeto");
        }
        return { documents };
    }

    async softDelete(projectId: number, documentId: number): Promise<{ document: Document }> {
        const document: Document = await this.prismaService.document.findFirst({ where: { id: documentId, projectId } });
        
        if (!document) {
            throw new NotFoundException("Documento nao existe");
        } else if(document.isDeleted) {
            await this.prismaService.document.delete({ where: { id: documentId } });
            return { document: null };
        } else {
            return { document: await this.prismaService.document.update({ data: { isDeleted: true }, where: { id: documentId } }) };
        }
    }
}
