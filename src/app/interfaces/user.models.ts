export class User {
  id: string
  email: string
  profile: {
    bio:string
    displayName:string
    icon:string
  }
  username: string


  constructor(id: string, email: string, profile: {
    bio: string;
    displayName: string;
    icon: string
  }, username: string) {
    this.id = id;
    this.email = email;
    this.profile = profile;
    this.username = username;
  }
}
