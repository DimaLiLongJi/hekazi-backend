import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../dao/role/role.entity';
import { RoleDAO } from '../dao/role/role.dao';
import { PermissionDAO } from '../dao/permission/permission.dao';
import { Role } from '../types';
import { IsNull, Like, Not } from 'typeorm';
import { QrcodeDAO } from 'src/dao/qrcode/qrcode.dao';
import { Qrcode } from 'src/types/qrcode';
import { QrcodeEntity } from 'src/dao/qrcode/qrcode.entity';
import { QrcodeMaterialDAO } from 'src/dao/qrcode-material/qrcode-material.dao';

@Injectable()
export class QrcodeService {
  constructor(
    private readonly dao: QrcodeDAO,
    private readonly qrcodeMaterialDAO: QrcodeMaterialDAO,
  ) {}

  public async create(qrcode: Qrcode): Promise<QrcodeEntity> {
    // const createdRole: any = {
    //   name: qrcode.name,
    //   creator: qrcode.creator,
    // };
    // if (role.permissionIds) createdRole.permissionList = await this.permissionDAO.findByIds(role.permissionIds);
    console.log('创建的二维码', qrcode);
    const createdQrcode = await this.dao.save(qrcode as any);
    if (qrcode.qrcodeMaterialList) {
      qrcode.qrcodeMaterialList.forEach(qm => qm.qrcode = createdQrcode.id);
      await this.qrcodeMaterialDAO.saveAll(qrcode.qrcodeMaterialList as any);
    }
    return this.findById(createdQrcode.id);
  }

  public find(params?: {
    pageIndex?: number,
    pageSize?: number,
    isOn?: '1' | '2',
    keyword?: string,
  }): Promise<[QrcodeEntity[], number]> {
    const where: any = {
      ...params,
    };
    if (where.isOn) delete where.isOn;
    if (params.isOn) where.deleteDate = (params.isOn === '1') ? IsNull() : Not(IsNull());
    if (where.keyword) {
      delete where.keyword;
      where.name = Like(`%${params.keyword}%`);
    }
    return this.dao.find(where);
  }

  public findById(id: number) {
    return this.dao.findById(id);
  }


  public async update(id: number, params?: Qrcode) {
    const qrcode = await this.dao.findById(id);
    if (!qrcode) return { success: false, message: `id 为 ${id} 的二维码不存在` };
    if (!params) return { success: true, message: `id 为 ${id} 的二维码更新成功` };
    try {
      const change = {
        ... qrcode,
        ...params,
      };
      if (params.isOn) {
        delete change.deleteDate;
        delete change.isOn;
        change.deleteDate = (params.isOn === '1') ? null : new Date();
      }
      // 先删除
      if (qrcode.qrcodeMaterialList && qrcode.qrcodeMaterialList.length > 0) {
        await this.qrcodeMaterialDAO.deleteAllByQrcodeIds(qrcode.qrcodeMaterialList.map(item => item.id));
      }
      if (params.qrcodeMaterialList) {
        await this.qrcodeMaterialDAO.saveAll(params.qrcodeMaterialList as any);
      }
      await this.dao.save(change as any);
      return { success: true, message: `id 为 ${id} 的二维码更新成功` };
    } catch (e) {
      return { success: false, message:  `id 为 ${id} 的二维码更新失败，原因：${e}` };
    }
  }
}
