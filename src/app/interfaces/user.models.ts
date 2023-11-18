export class UserModels {
  id?: string
  email?: string
  profile?: string
  displayName?: string
  username?: string


  constructor(id: string, email: string, profile: string, displayName: string, username: string) {
    this.id = id;
    this.email = email;
    this.profile = profile;
    this.displayName = displayName;
    this.username = username;
  }
}
