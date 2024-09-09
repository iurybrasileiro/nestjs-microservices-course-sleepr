import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, User, Role } from '@app/common';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
