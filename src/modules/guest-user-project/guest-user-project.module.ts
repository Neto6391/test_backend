import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { GuestUserProjectService } from './guest-user-project.service';

@Module({
  imports: [PrismaModule],
  providers: [GuestUserProjectService],
  exports: [GuestUserProjectService]
})
export class GuestUserProjectModule {}
