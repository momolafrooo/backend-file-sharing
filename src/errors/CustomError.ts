export class CustomError {
  public status: number;
  public message: string;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}
