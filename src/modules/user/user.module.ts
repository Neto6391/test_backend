import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(()=> AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
