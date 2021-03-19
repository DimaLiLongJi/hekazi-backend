import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, FindOperator } from 'typeorm';
import { QrcodeEntity } from './qrcode.entity';

@Injectable()
export class QrcodeDAO {
  constructor(
    @InjectRepository(QrcodeEntity)
    private readonly repository: Repository<QrcodeEntity>,
  ) {}

  public async save(qrcode: QrcodeEntity): Promise<QrcodeEntity> {
    return this.repository.save(qrcode);
  }

  public async findAll(): Promise<QrcodeEntity[]> {
    return this.repository.find({
      relations: ['creator', 'qrcodeMaterialList', 'qrcodeMaterialList.material', 'qrcodeMaterialList.material.file'],
      order: {
        id: 'ASC',
      },
    });
  }

  public async findOne(where: any): Promise<QrcodeEntity> {
    return this.repository.findOne({ where, relations: ['creator', 'qrcodeMaterialList', 'qrcodeMaterialList.material', 'qrcodeMaterialList.material.file'] });
  }

  public async findById(id: number): Promise<QrcodeEntity> {
    return this.repository.findOne(id, {relations: ['creator', 'qrcodeMaterialList', 'qrcodeMaterialList.material', 'qrcodeMaterialList.material.file']});
  }

  public async update(id: number, params: any = {}): Promise<UpdateResult> {
    return this.repository.update(id, params);
  }

  public find(params?: {
    pageIndex?: number,
    pageSize?: number,
    deleteDate?: FindOperator<any> | Date,
  }): Promise<[QrcodeEntity[], number]> {
    const skip = (params.pageIndex - 1) * params.pageSize;
    const where = {...params};
    delete where.pageIndex;
    delete where.pageSize;
    return this.repository.findAndCount({
      skip,
      take: params.pageSize,
      where,
      relations: ['creator', 'qrcodeMaterialList', 'qrcodeMaterialList.material', 'qrcodeMaterialList.material.file'],
      order: {
        id: 'ASC',
      },
    });
  }
}
