import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/prisma/prisma.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectService } from './modules/project/project.service';
import { ProjectModule } from './modules/project/project.module';
import { DocumentService } from './modules/document/document.service';
import { DocumentController } from './modules/document/document.controller';
import { DocumentModule } from './modules/document/document.module';
import { GuestUserProjectModule } from './modules/guest-user-project/guest-user-project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, UserModule, AuthModule, ProjectModule, DocumentModule, GuestUserProjectModule],
  controllers: [AppController, DocumentController],
  providers: [AppService, PrismaService, ProjectService, DocumentService],
})
export class AppModule {}
