export interface IUserItem {
  active: boolean;
  fullname: string;
  contentWatting?: number;
  avata: string;
}
export interface IListUserComment extends IUserItem {
    id: string;
 }

