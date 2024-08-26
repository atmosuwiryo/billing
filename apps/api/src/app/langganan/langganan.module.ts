import { Module } from '@nestjs/common';
import { LanggananService } from './langganan.service';
import { LanggananController } from './langganan.controller';

@Module({
  controllers: [LanggananController],
  providers: [LanggananService],
})
export class LanggananModule {}
