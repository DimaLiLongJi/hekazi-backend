import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PermissionEntity } from '../permission/permission.entity';

export enum PermissionType {
  route = 1,
  operating = 2,
}

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  public id?: number;

  @Column({ unique: true })
  public name?: string;

  @ManyToMany(type => PermissionEntity, permission => permission.id, {deferrable: 'INITIALLY DEFERRED'})
  @JoinTable({
    name: 'role_permission', // 此关系的联结表的表名
    joinColumn: {
      name: 'role',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission',
      referencedColumnName: 'id',
    },
  })
  public permissionList?: PermissionEntity[];


  @ManyToOne(type => UserEntity, user => user.id, { nullable: false, deferrable: 'INITIALLY DEFERRED' })
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
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
