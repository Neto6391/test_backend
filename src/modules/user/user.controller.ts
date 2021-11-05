import {  Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { DoesUserDeletedGuard } from 'src/core/guards/does-user-deleted.guard';
import { DoesUserExistsGuard } from 'src/core/guards/does-user-exists.guard';
import { DoesUserFoundGuard } from 'src/core/guards/does-user-found.guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    
    @UseGuards(JwtAuthGuard, DoesUserDeletedGuard)
    @Get("findAll")
    async getAllUsers() {
        return await this.userService.readAll();
    }

    @UseGuards(JwtAuthGuard, DoesUserDeletedGuard)
    @Get(":id")
    async findById(@Param("id") id: string) {
        const userFound = await this.userService.readById(parseInt(id));
        if (userFound) {
            return userFound;
        } else {
            throw new NotFoundException("Usuario nao existe");
        }
        
    }

    @UseGuards(DoesUserExistsGuard)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async authenticate(@Request() req) {
        return await this.userService.authenticate(req.user);
    }

    @UseGuards(JwtAuthGuard, DoesUserFoundGuard, DoesUserDeletedGuard)
    @Put(":id")
    async updateUser(@Param("id") userId: string, @Body() createUserDto: CreateUserDto) {
        return await this.userService.update(createUserDto, parseInt(userId));
    }

    @UseGuards(JwtAuthGuard, DoesUserFoundGuard)
    @Delete(":id")
    async deleteUser(@Param("id") userId: string) {
        return await this.userService.softDelete(parseInt(userId));
    }
}


