import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PaketModule } from './paket/paket.module';
import { ProdukModule } from './produk/produk.module';
import { LanggananModule } from './langganan/langganan.module';
import { TagihanModule } from './tagihan/tagihan.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from '../services/services.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServicesModule,
    UserModule,
    PaketModule,
    ProdukModule,
    LanggananModule,
    TagihanModule,
    ProfileModule,
  ],
})
export class AppModule {}
