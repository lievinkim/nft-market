import { Module } from '@nestjs/common';
import { NftsController } from './nfts.controller';
import { Nfts, NftsSchema } from './nfts.schema';
import { NftsService } from './nfts.service';
import { NftsRepository } from './nfts.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nfts.name, schema: NftsSchema }]),
  ],
  controllers: [NftsController],
  providers: [NftsService, NftsRepository],
  exports: [NftsService, NftsRepository],
})
export class NftsModule {}
