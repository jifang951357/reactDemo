export default interface User {
  userId: string;
  username: string;
  sex: string;
  status: string;
  mobile: string;
  email: string;
  createTime: string;
  // tslint:disable-next-line:no-any
  [propName: string]: any;
}
