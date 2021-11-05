import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
  
})
export class ProjectModule {}
