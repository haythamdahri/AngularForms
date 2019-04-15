export class UserModel {
  constructor(public username: string,
              public email: string,
              public secretQuestion: string,
              public questionAnswer: string,
              public gender: string) {
  }
}
