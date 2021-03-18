
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { QrcodeMaterialEntity } from '../qrcode-material/qrcode-material.entity';
import { UserEntity } from '../user/user.entity';

export enum PermissionType {
  route = 1,
  operating = 2,
}

@Entity('qrcode')
export class QrcodeEntity {
  @PrimaryGeneratedColumn('increment')
  public id?: number;

  @Column()
  public name: string;

  @OneToMany(type => QrcodeMaterialEntity, entity => entity.qrcode, {deferrable: 'INITIALLY DEFERRED'})
  public qrcodeMaterialList?: QrcodeMaterialEntity[];

  @ManyToOne(type => UserEntity, user => user.id, {nullable: false,deferrable: 'INITIALLY DEFERRED'})
  @JoinColumn({name: 'creatorId', referencedColumnName: 'id'})
  public creator?: UserEntity;

  // 创建时间
  @CreateDateColumn({ name: 'create_date' })
  public createDate?: Date = new Date();

  // 修改时间
  @UpdateDateColumn({ name: 'update_date' })
  public updateDate?: Date = new Date();

  @Column({ name: 'delete_date', type: 'datetime', nullable: true })
  public deleteDate?: Date = new Date();
}
