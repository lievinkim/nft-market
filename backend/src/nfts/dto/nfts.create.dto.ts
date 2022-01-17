import { PickType } from '@nestjs/swagger';
import { Nfts } from '../nfts.schema';

export class NftsCreateDto extends PickType(Nfts, [
  'name',
  'nameEng',
  'rarity',
] as const) {}
