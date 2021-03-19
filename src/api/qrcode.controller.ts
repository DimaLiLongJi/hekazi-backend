import { Controller, Get, Body, Post, Query, Put, Param, Req } from '@nestjs/common';
import { IResponse } from '../types';
import { Request } from 'express';
import { QrcodeService } from 'src/service/qrcode.service';
import { Qrcode } from 'src/types/qrcode';
import { QrcodeEntity } from 'src/dao/qrcode/qrcode.entity';
import { MaterialEntity } from 'src/dao/material/material.entity';

@Controller('/api/qrcode')
export class QrcodeController {
  constructor(
    private readonly service: QrcodeService,
  ) { }

  @Post('/')
  public async create(
    @Body() qrcode: Qrcode,
    @Req() req: Request,
  ): Promise<IResponse<QrcodeEntity>> {
    try {
      qrcode.creator = Number(req.headers.authId);
      const info = await this.service.create(qrcode);
      return {
        success: true,
        message: '创建二维码页面成功',
        data: info,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  @Get('/random/:id')
  public async findRandomById(
    @Param('id') id: number,
  ): Promise<IResponse<MaterialEntity>> {
    try {
      const info = await this.service.findRandomById(id);
      return {
        success: true,
        message: `获取id为${id}的二维码页面成功`,
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
    @Query() params?: {
      pageIndex?: number,
      pageSize?: number,
      isOn?: '1' | '2',
      keyword?: string,
    },
  ): Promise<IResponse<[QrcodeEntity[], number]>> {
    try {
      const list = await this.service.find(params);
      return {
        success: true,
        message: '获取全部二维码页面成功',
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
  ): Promise<IResponse<QrcodeEntity>> {
    try {
      const info = await this.service.findById(id);
      return {
        success: true,
        message: `获取id为${id}的二维码页面成功`,
        data: info,
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
    @Body() qrcode?: Qrcode,
  ): Promise<IResponse> {
    try {
      return await this.service.update(id, qrcode);
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  @Post(':id')
  public async update2(
    @Param('id') id: number,
    @Body() qrcode?: Qrcode,
  ): Promise<IResponse> {
    try {
      return await this.service.update(id, qrcode);
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }
}
