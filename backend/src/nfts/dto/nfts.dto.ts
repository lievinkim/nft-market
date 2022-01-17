import { PickType } from '@nestjs/swagger';
import { Nfts } from '../nfts.schema';

export class NftDto extends PickType(Nfts, [
  'sheetId',
  'name',
  'nameEng',
  'rarity',
  'minted',
  'owner',
] as const) {}
