import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { PermissionService } from './permission.service';
import { ModuleService } from './module.service';
import { RoleService } from './role.service';
import { ExcelService } from './excel.service';
import { FileService } from './file.service';
import { MaterialService } from './material.service';
import { QrcodeService } from './qrcode.service';


const serviceList = [
  EnvService,
  AuthService,
  UserService,
  PermissionService,
  ModuleService,
  RoleService,
  ExcelService,
  FileService,
  MaterialService,
  QrcodeService,
];

const envService = new EnvService();
const config = envService.getConfig();

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: '7 days',
      },
    }),
  ],
  providers: [
    ...serviceList,
  ],
  exports: [
    JwtModule,
    ...serviceList,
  ],
})
export class ServiceModule { }
