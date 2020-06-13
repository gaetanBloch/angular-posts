export class Post {
  constructor(public title: string,
              public content: string,
              // tslint:disable-next-line:variable-name
              public _id: string = null) {
  }
}
