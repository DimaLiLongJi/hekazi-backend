import { Injectable } from '@nestjs/common';
import { ModuleEntity } from '../dao/module/module.entity';
import { File } from '../types';
import { ModuleDAO } from '../dao/module/module.dao';
import { IMaterialSearch, Material } from 'src/types/material';
import { MaterialDAO } from 'src/dao/material/material.dao';
import { MaterialEntity } from 'src/dao/material/material.entity';
import { FileService } from './file.service';
import { IsNull, Like, Not } from '_typeorm@0.2.31@typeorm';

@Injectable()
export class MaterialService {
  constructor(
    private readonly dao: MaterialDAO,
    private readonly fileService: FileService,
  ) {}

  public async save(mod: Material): Promise<MaterialEntity> {
    return this.dao.save(mod);
  }

  public async findAll(): Promise<[ModuleEntity[], number]> {
    return this.dao.findAll();
  }

  public async addFile(
    file: {
      fieldname: string,
      originalname: string,
      encoding: string,
      mimetype: string,
      buffer: Buffer,
      size: number,
    },
    updaterId: number,
    materialId?: number,
  ) {
    const createdFile: File = {};
    createdFile.name = this.fileService.writeFile(file);
    createdFile.creator = updaterId;
    const addFile = await this.fileService.create(createdFile);
    console.log(777777, addFile);
    if (!materialId) return addFile;

    const material = await this.dao.findById(materialId);
    if (!material) return { success: false, message: `id 为 ${materialId} 的素材不存在` };
    if (!file) return { success: true, message: `id 为 ${materialId} 的素材增加附件成功` };

    const updatedMaterial: any = { ...material };
    delete updatedMaterial.creator; // 创建者不能改，要删了草

    updatedMaterial.file = addFile.id;

    await this.dao.save(updatedMaterial);

    return addFile;
  }

  public async deleteFile(id: number, fileId: number, updaterId: number) {
    const material = await this.dao.findById(id);
    if (!material) return { success: false, message: `id 为 ${id} 的素材不存在` };
    if (!material) return { success: true, message: `id 为 ${id} 的素材删除附件成功` };

    const updatedMaterial: any = { ...material };
    delete updatedMaterial.creator; // 创建者不能改，要删了草

    try {
      const deleteFile = await this.fileService.findById(fileId);
      if (!deleteFile) return { success: true, message: `id 为 ${id} 的素材删除附件成功` };

      if (!material.file) return { success: true, message: `id 为 ${id} 的素材删除附件成功` };
      else updatedMaterial.file = null;
      updatedMaterial.creator = updaterId;
      await this.dao.save(updatedMaterial);


      return { success: true, message: `id 为 ${id} 的素材附件更新成功` };
    } catch (e) {
      return { success: false, message: e};
    }
  }

  public async find(params?: IMaterialSearch): Promise<[MaterialEntity[], number]> {
    const where: any = {
      ...params,
    };
    if (where.isOn) delete where.isOn;
    if (params.isOn) {
      where.deleteDate = (params.isOn === '1') ? IsNull() : Not(IsNull());
    }
    if (where.keyword) {
      delete where.keyword;
      where.name = Like(`%${params.keyword}%`);
    }
    return this.dao.find(where);
  }

  public async findById(id: number): Promise<MaterialEntity> {
    return this.dao.findById(id);
  }

  public async update(id: number, params: any) {
    const material = await this.dao.findById(id);
    if (!material) return { success: false, message: `id 为 ${id} 的素材不存在` };
    try {
      if (params.isOn) {
        delete params.deleteDate;
        params.deleteDate = (params.isOn === '1') ? null : new Date();
        delete params.isOn;
      }
      await this.dao.update(id, params);
      return { success: true, message: `id 为 ${id} 的素材限更新成功` };
    } catch (e) {
      return { success: false, message:  `id 为 ${id} 的素材更新失败，原因：${e}` };
    }
  }
}
