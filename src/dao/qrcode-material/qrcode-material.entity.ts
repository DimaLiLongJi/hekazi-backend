
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { MaterialEntity } from '../material/material.entity';
import { QrcodeEntity } from '../qrcode/qrcode.entity';


@Entity('qrcode-material')
export class QrcodeMaterialEntity {
  @PrimaryGeneratedColumn('increment')
  public id?: number;

  @Column()
  public probability: number;

  @ManyToOne(type => MaterialEntity, entity => entity.id, { nullable: false, deferrable: 'INITIALLY DEFERRED' })
  @JoinColumn({ name: 'materialId', referencedColumnName: 'id' })
  public material?: MaterialEntity;

  @ManyToOne(type => QrcodeEntity, entity => entity.id, { nullable: false, deferrable: 'INITIALLY DEFERRED' })
  @JoinColumn({ name: 'qrcodeId', referencedColumnName: 'id' })
  public qrcode?: QrcodeEntity;
}
