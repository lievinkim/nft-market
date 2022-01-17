import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NftsCreateDto } from './dto/nfts.create.dto';
import { NftDto } from './dto/nfts.dto';
import { NftsService } from './nfts.service';

@Controller('nfts')
export class NftsController {
  constructor(private nftsService: NftsService) {}

  @Get()
  getAllNfts(): Promise<NftDto[]> {
    return this.nftsService.getAllNfts();
  }

  @Get('/:owner')
  getMyNfts(@Param('owner') owner: string): Promise<NftDto[]> {
    return this.nftsService.getMyNfts(owner);
  }

  @Post('/mint/:owner')
  mintNft(@Param('owner') owner: string): Promise<NftDto> {
    return this.nftsService.mintNft(owner);
  }

  @Post('/')
  createNft(@Body() nftsCreateDto: NftsCreateDto): Promise<NftDto> {
    return this.nftsService.createNft(nftsCreateDto);
  }
}
