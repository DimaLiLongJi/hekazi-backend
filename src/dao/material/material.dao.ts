import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MaterialEntity } from './material.entity';
import { Material } from 'src/types/material';

@Injectable()
export class MaterialDAO {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly repository: Repository<MaterialEntity>,
  ) {}

  public async save(item: Material): Promise<MaterialEntity> {
    return this.repository.save(item as any);
  }

  public async findAll(): Promise<[MaterialEntity[], number]> {
    return this.repository.findAndCount({
      relations: ['creator', 'file'],
      order: {
        id: 'ASC',
      },
    });
  }

  public async findOne(where: any): Promise<MaterialEntity> {
    return this.repository.findOne({
      where,
      relations: ['creator', 'file'],
    });
  }

  public async find(params: any): Promise<[MaterialEntity[], number]> {
    const skip = (params.pageIndex - 1) * params.pageSize;
    const where = {...params};
    if (!params.type) delete where.type;
    delete where.pageIndex;
    delete where.pageSize;
    return this.repository.findAndCount({
      skip,
      take: params.pageSize,
      where,
      relations: ['creator', 'file'],
      order: {
        id: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<MaterialEntity> {
    return this.repository.findOne(id, {relations: ['creator', 'file']});
  }

  public async update(id: number, params: any = {}): Promise<UpdateResult> {
    return this.repository.update(id, params);
  }
}
