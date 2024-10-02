import { injectable } from "../../src";

@injectable
export class LoggingService {
  log(message: string) {
    console.log(message)
  }
}