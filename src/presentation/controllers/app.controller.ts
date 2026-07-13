import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../application/services/app.service';
import { Public } from '../../shared/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
