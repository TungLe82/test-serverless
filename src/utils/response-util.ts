export default class HttpResponseModel {
  public message: string;
  public status: number;
  public data: any;

  constructor(status: number, data?: any, message?: string) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
