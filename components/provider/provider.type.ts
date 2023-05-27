export interface IAccount {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  follows: string;
  friends: string[];
  rooms: string[];
  blocked: boolean;
  permission: string;
  address: string;
  phone: string;
  email: string;
}
export interface TFeactData {
  message: string;
  status: number;
  account: IAccount;
}
