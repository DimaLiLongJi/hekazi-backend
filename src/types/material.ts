export class Material {
  public id?: number;
  public name: string;
  public background?: string;
  public file: number;
  public creator: number;
  public createDate?: Date;
  public updateDate?: Date;
  public deleteDate?: Date;
}

export interface IMaterialSearch {
  keyword?: string,
  pageIndex?: number,
  pageSize?: number,
  isOn?: '1' | '2' | '',
  deleteDate?: Date;
}