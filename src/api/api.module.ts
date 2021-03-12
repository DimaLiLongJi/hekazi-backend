import { Module, MiddlewareConsumer } from '@nestjs/common';

import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AuthMiddleware } from '../middleware/auth.middleware';

import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { PermissionController } from './permission.controller';
import { ModuleController } from './module.controller';
import { RoleController } from './role.controller';
import { MaterialController } from './material.controller'

@Module({
  controllers: [
    UserController,
    AuthController,
    PermissionController,
    ModuleController,
    RoleController,
    MaterialController,
  ],
})
export class ApiModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthMiddleware)
      .forRoutes('/api');
  }
}
