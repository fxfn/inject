import { inject, injectable } from "../../src";
import { LoggingService } from "./logging";
import { ITransform } from "./transform";

@injectable
export class JsonTransform implements ITransform {

  @inject(LoggingService)
  loggingService: LoggingService

  transform(data: any) {
    this.loggingService.log("transforming data")
  }
}