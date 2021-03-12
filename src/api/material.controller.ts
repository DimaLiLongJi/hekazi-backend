import { Controller, Body, Post, Res, Get, Req, Header, UseInterceptors, UploadedFile, Query, Param, Put } from '@nestjs/common';
import { IResponse } from '../types';
import { Request } from 'express';
import { MaterialService } from 'src/service/material.service';
import { IMaterialSearch, Material } from 'src/types/material';
import { MaterialEntity } from 'src/dao/material/material.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/material')
export class MaterialController {
  constructor(
    private readonly service: MaterialService,
  ) { }

  @Post('/')
  public async create(
    @Body() mod: Material,
    @Req() req: Request,
  ): Promise<IResponse<MaterialEntity>> {
    try {
      mod.creator = Number(req.headers.authId);
      const modInfo = await this.service.save(mod);
      return {
        success: true,
        message: '创建素材成功',
        data: modInfo,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() material?: Material,
  ): Promise<IResponse> {
    try {
      return await this.service.update(id, material);
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  @Post('/addFile')
  @Header('Content-Type', 'multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async addFile(
    @Req() req: Request,
    @UploadedFile() file: {
      fieldname: string,
      originalname: string,
      encoding: string,
      mimetype: string,
      buffer: Buffer,
      size: number,
    },
    @Body() body?: { materialId?: number },
  ) {
    try {
      const info = await this.service.addFile(file, Number(req.headers.authId), body.materialId);
      return {
        success: true,
        message: '创建附件成功',
        data: info,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  @Get('/find')
  public async find(
    @Query() params?: IMaterialSearch,
  ): Promise<IResponse<[MaterialEntity[], number]>> {
    try {
      const list = await this.service.find(params);
      return {
        success: true,
        message: '获取素材成功',
        data: list,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  @Get('/all')
  public async getAll(): Promise<IResponse<[MaterialEntity[], number]>> {
    try {
      const list = await this.service.findAll();
      return {
        success: true,
        message: '获取全部素材成功',
        data: list,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  @Get(':id')
  public async getById(
    @Param('id') id: number,
  ): Promise<IResponse<MaterialEntity>> {
    try {
      const info = await this.service.findById(id);
      return {
        success: true,
        message: `获取id为${id}的素材成功`,
        data: info,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }
}
