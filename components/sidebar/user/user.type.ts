export interface IUserItem {
  active: boolean;
  fullname: string;
  contentWatting?: number;
  avata: string;
  _id: string | number;
}
export interface IListUserComment extends IUserItem {}
