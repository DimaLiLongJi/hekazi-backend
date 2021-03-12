import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PermissionEntity } from '../permission/permission.entity';
import { FileEntity } from '../file/file.entity';

@Entity('material')
export class MaterialEntity {
  @PrimaryGeneratedColumn('increment')
  public id?: number;

  @Column({type: 'varchar', length: 255, nullable: false})
  public name?: string;

  @Column({type: 'varchar', length: 255})
  public background?: string;

  @OneToMany(type => PermissionEntity, permission => permission.module, {deferrable: 'INITIALLY DEFERRED'})
  public permissionList?: PermissionEntity[];

  // 资源列表
  @ManyToOne(type => FileEntity, file => file.id, {nullable: false,deferrable: 'INITIALLY DEFERRED'})
  @JoinColumn({name: 'fileId', referencedColumnName: 'id'})
  public file?: FileEntity;

  @ManyToOne(type => UserEntity, user => user.id, {nullable: false,deferrable: 'INITIALLY DEFERRED'})
  @JoinColumn({name: 'creatorId', referencedColumnName: 'id'})
  public creator?: UserEntity;

  // 创建时间
  @CreateDateColumn({ name: 'create_date' })
  public createDate?: Date = new Date();

  // 修改时间
  @UpdateDateColumn({ name: 'update_date' })
  public updateDate?: Date = new Date();

  @Column({name: 'delete_date', type: 'datetime', nullable: true})
  public deleteDate?: Date = new Date();
}
