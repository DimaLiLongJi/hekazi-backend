import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user/user.entity';
import { PermissionEntity } from './permission/permission.entity';
import { ModuleEntity } from './module/module.entity';
import { RoleEntity } from './role/role.entity';
import { FileEntity } from './file/file.entity';
import { MaterialEntity } from './material/material.entity';

import { UserDAO } from './user/user.dao';
import { ModuleDAO } from './module/module.dao';
import { PermissionDAO } from './permission/permission.dao';
import { RoleDAO } from './role/role.dao';
import { FileDAO } from './file/file.dao';
import { MaterialDAO } from './material/material.dao';

import { EnvService } from '../service/env.service';

const envService = new EnvService();
const config = envService.getConfig();

const DOAList = [
  UserDAO,
  PermissionDAO,
  ModuleDAO,
  RoleDAO,
  FileDAO,
  MaterialDAO,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: 'all',
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      PermissionEntity,
      ModuleEntity,
      RoleEntity,
      FileEntity,
      MaterialEntity,
    ]),
  ],
  providers: [
    ...DOAList,
  ],
  exports: [
    ...DOAList,
  ],
})
export class DAOModule { }
