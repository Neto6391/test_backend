import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { GuestUserProjectModule } from '../guest-user-project/guest-user-project.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule, GuestUserProjectModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
  
})
export class ProjectModule {}
