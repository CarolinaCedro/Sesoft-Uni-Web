export class User {
  id: string
  email: string
  profile: {
    bio:string
    displayName:string
    icon:string
  }
  username: string

  following?: boolean


  constructor(id: string, email: string, profile: {
    bio: string;
    displayName: string;
    icon: string
  }, username: string, following: boolean) {
    this.id = id;
    this.email = email;
    this.profile = profile;
    this.username = username;
    this.following = following;
  }
}
