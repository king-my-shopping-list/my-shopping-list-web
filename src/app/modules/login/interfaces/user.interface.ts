import { IBase } from '../../../core/interfaces/base.interface';

export interface IUser extends IBase {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  photoUrl: string;
}
