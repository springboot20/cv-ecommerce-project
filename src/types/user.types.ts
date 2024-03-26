export interface UserInterface {
  _id: string;
  avatar: {
    url: string;
    localPath: string;
  };
  username: string;
  email: string;
}
