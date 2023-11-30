import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Logger } from "@nestjs/common";
import { Public } from "../auth/decorator/public.decorator";

@ApiTags("health")
@Controller("")
export class CommonController {

  private logger = new Logger(CommonController.name);

  @Public()
  @ApiOperation({ summary: 'Health check end-point' })
  @Get("/health")
  public healthCheck() {
    return {
      status: "UP"
    };
  }

}