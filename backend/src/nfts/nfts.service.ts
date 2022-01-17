import { Injectable } from '@nestjs/common';
import { NftsCreateDto } from './dto/nfts.create.dto';
import { NftDto } from './dto/nfts.dto';
import { NftsRepository } from './nfts.repository';

@Injectable()
export class NftsService {
  constructor(private readonly nftsRepository: NftsRepository) {}

  async getAllNfts(): Promise<NftDto[]> {
    return await this.nftsRepository.getAllNfts();
  }

  async getMyNfts(owner: string): Promise<NftDto[]> {
    return await this.nftsRepository.getMyNfts(owner);
  }

  async mintNft(owner: string): Promise<NftDto> {
    return await this.nftsRepository.mintNft(owner);
  }

  async createNft(nftsCreateDto: NftsCreateDto) {
    return await this.nftsRepository.createNft(nftsCreateDto);
  }
}
