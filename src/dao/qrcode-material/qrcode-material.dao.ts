
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrcodeMaterialEntity } from './qrcode-material.entity';

@Injectable()
export class QrcodeMaterialDAO {
  constructor(
    @InjectRepository(QrcodeMaterialEntity)
    private readonly repository: Repository<QrcodeMaterialEntity>,
  ) {}

  public async save(demandTypeStatusIndex: QrcodeMaterialEntity): Promise<QrcodeMaterialEntity> {
    return this.repository.save(demandTypeStatusIndex);
  }

  public removeAll(list: QrcodeMaterialEntity[]) {
    return this.repository.remove(list);
  }
  public deleteAllByQrcodeIds(ids: number[]) {
    return this.repository.delete(ids);
  }

  public async saveAll(list: QrcodeMaterialEntity[]): Promise<QrcodeMaterialEntity[]> {
    return this.repository.save(list);
  }

  public findByQrocodeId(id: number): Promise<QrcodeMaterialEntity[]> {
    return this.repository.find({
      where: {
        qrocode: id,
      },
      relations: ['qrocode', 'material'],
      order: {
        probability: 'ASC',
      },
    });
  }
}
