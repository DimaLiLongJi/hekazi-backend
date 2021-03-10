import { Permission } from './permission';

export class Role {
  public id?: number;
  public name?: string;
  public permissionIds?: number[];
  public permissionList?: Permission[];
  public creator?: number;
  public createDate?: Date;
  public updateDate?: Date;
  public deleteDate?: Date;
  public isOn?: string;
}
