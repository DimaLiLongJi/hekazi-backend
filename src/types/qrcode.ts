import { QrcodeMaterial } from "./qrcode-material";

export class Qrcode {
  public id?: number;
  public name?: string;
  public creator?: number;
  public qrcodeMaterialList?: QrcodeMaterial[];
  public createDate?: Date;
  public updateDate?: Date;
  public deleteDate?: Date;
  public isOn?: '1' | '2';
}