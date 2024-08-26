import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PaketModule } from './paket/paket.module';
import { ProdukModule } from './produk/produk.module';
import { LanggananModule } from './langganan/langganan.module';
import { TagihanModule } from './tagihan/tagihan.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PaketModule,
    ProdukModule,
    LanggananModule,
    TagihanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
